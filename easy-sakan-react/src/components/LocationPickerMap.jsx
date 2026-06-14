import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// IMPORT LANGUAGE CONTEXT
import { useLanguage } from '../context/LanguageContext';
import { transportationTranslations } from '../data/Transportation';
import '../styles/transportation.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const pickupIcon = new L.Icon({
  iconUrl:      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:     [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const dropoffIcon = new L.Icon({
  iconUrl:      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:     [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const c =
    sinLat * sinLat +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * sinLng * sinLng;
  return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}

// Auto-detect: first click sets pickup (if missing), second sets dropoff
function ClickHandler({ pickup, onPickup, onDropoff }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (!pickup) onPickup({ lat, lng });
      else onDropoff({ lat, lng });
    },
  });
  return null;
}

function FlyTo({ target }) {
  const map = useMap();
  useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
  }, [target, map]);
  return null;
}

// Added 'lang' prop to localize API results
function SearchBox({ color, placeholder, value, onChange, onSelect, lang }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  const search = useCallback((q) => {
    if (q.trim().length < 3) { setResults([]); return; }
    setLoading(true);
    // Use the 'lang' prop to get localized search results from OpenStreetMap
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ', Egypt')}&format=json&limit=5&addressdetails=1`,
      { headers: { 'Accept-Language': lang } } 
    )
      .then(r => r.json())
      .then(data => setResults(data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [lang]);

  const handleInput = (e) => {
    onChange(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(e.target.value), 400);
  };

  const handleSelect = (result) => {
    const coords = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
    const label = result.display_name.split(',').slice(0, 3).join(',').trim();
    onChange(label);
    setResults([]);
    onSelect({ ...coords, label });
  };

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setResults([]);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapperRef} className="loc-search-wrapper">
      <div className="loc-search-row">
        <span className="loc-dot" style={{ background: color }} />
        <input
          className="loc-search-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInput}
          autoComplete="off"
        />
        {loading && <span className="loc-spinner" />}
      </div>
      {results.length > 0 && (
        <ul className="loc-results">
          {results.map((r) => (
            <li key={r.place_id} onMouseDown={() => handleSelect(r)}>
              {r.display_name.split(',').slice(0, 4).join(',')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function LocationPickerMap({
  pickup,
  dropoff,
  onPickup,
  onDropoff,
  onDistanceChange,
}) {
  // Get language and translations
  const { lang } = useLanguage();
  const t = transportationTranslations[lang].mapPicker;

  const [pickupQuery,  setPickupQuery]  = useState('');
  const [dropoffQuery, setDropoffQuery] = useState('');
  const [flyTarget,    setFlyTarget]    = useState(null);
  const [routeCoords,  setRouteCoords]  = useState(null); 
  const [routeInfo,    setRouteInfo]    = useState(null); 
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    if (!pickup || !dropoff) {
      setRouteCoords(null);
      setRouteInfo(null);
      onDistanceChange(null);
      return;
    }

    setRouteLoading(true);
    fetch(
      `https://router.project-osrm.org/route/v1/driving/` +
      `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}` +
      `?overview=full&geometries=geojson`
    )
      .then(r => r.json())
      .then(data => {
        if (data.routes?.length) {
          const route = data.routes[0];
          const km      = route.distance / 1000;
          const minutes = Math.round(route.duration / 60);
          const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
          setRouteCoords(coords);
          setRouteInfo({ km, minutes });
          onDistanceChange(km);
        }
      })
      .catch(() => {
        const km = haversineKm(pickup, dropoff) * 1.35;
        setRouteCoords(null);
        setRouteInfo({ km, minutes: null });
        onDistanceChange(km);
      })
      .finally(() => setRouteLoading(false));
  }, [pickup, dropoff, onDistanceChange]);

  const handlePickupSelect = (coords) => {
    onPickup(coords);
    setPickupQuery(coords.label || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setFlyTarget(coords);
  };

  const handleDropoffSelect = (coords) => {
    onDropoff(coords);
    setDropoffQuery(coords.label || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setFlyTarget(coords);
  };

  const handleMapPickup = (coords) => {
    onPickup(coords);
    setPickupQuery(`${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
  };

  const handleMapDropoff = (coords) => {
    onDropoff(coords);
    setDropoffQuery(`${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
  };

  const cairoCenter = [30.0444, 31.2357];

  return (
    <div className="loc-picker-container">
      {/* Pickup search section */}
      <div className="loc-section loc-section-pickup">
        <div className="loc-section-label">
          <span className="loc-dot" style={{ background: '#22c55e' }} />
          {t.pickupLabel}
        </div>
        <SearchBox
          color="#22c55e"
          placeholder={t.pickupPlaceholder}
          value={pickupQuery}
          onChange={setPickupQuery}
          onSelect={handlePickupSelect}
          lang={lang}
        />
        {pickup && (
          <p className="loc-set-hint loc-set-pickup">
            {t.hintPickup}
          </p>
        )}
      </div>

      {/* Divider with arrow */}
      <div className="loc-divider">
        <span className="loc-arrow">↓</span>
      </div>

      {/* Dropoff search section */}
      <div className="loc-section loc-section-dropoff">
        <div className="loc-section-label">
          <span className="loc-dot" style={{ background: '#ef4444' }} />
          {t.dropoffLabel}
        </div>
        <SearchBox
          color="#ef4444"
          placeholder={t.dropoffPlaceholder}
          value={dropoffQuery}
          onChange={setDropoffQuery}
          onSelect={handleDropoffSelect}
          lang={lang}
        />
        {dropoff && (
          <p className="loc-set-hint loc-set-dropoff">
            {t.hintDropoff}
          </p>
        )}
      </div>

      {/* Route info bar / map hint */}
      <div className="loc-map-hint">
        {routeLoading && (
          <span className="route-loading">
            <span className="loc-spinner" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} />
            {t.calculating}
          </span>
        )}
        {!routeLoading && routeInfo && (
          <span className="route-info-text">
            🛣️ <strong>{routeInfo.km.toFixed(1)} {t.kmLabel}</strong> {t.byRoad}
            {routeInfo.minutes !== null && (
              <> &nbsp;·&nbsp; ~<strong>{routeInfo.minutes}</strong> {t.minutesLabel} {t.drive}</>
            )}
          </span>
        )}
        {!routeLoading && !routeInfo && !pickup && t.instruction1}
        {!routeLoading && !routeInfo && pickup && !dropoff && t.instruction2}
      </div>

      <MapContainer
        center={cairoCenter}
        zoom={11}
        style={{ height: '340px', width: '100%', borderRadius: '0 0 12px 12px', zIndex: 0 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <ClickHandler pickup={pickup} onPickup={handleMapPickup} onDropoff={handleMapDropoff} />
        <FlyTo target={flyTarget} />

        {pickup  && <Marker position={[pickup.lat,  pickup.lng]}  icon={pickupIcon}  />}
        {dropoff && <Marker position={[dropoff.lat, dropoff.lng]} icon={dropoffIcon} />}

        {routeCoords && (
          <Polyline
            positions={routeCoords}
            pathOptions={{ color: '#1876d3', weight: 5, opacity: 0.75 }}
          />
        )}

        {routeLoading && pickup && dropoff && (
          <Polyline
            positions={[[pickup.lat, pickup.lng], [dropoff.lat, dropoff.lng]]}
            pathOptions={{ color: '#93c5fd', weight: 2, dashArray: '6 6' }}
          />
        )}
      </MapContainer>
    </div>
  );
}