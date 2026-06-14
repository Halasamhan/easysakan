import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../context/LanguageContext';
import '../styles/transportation.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const locationIcon = new L.Icon({
  iconUrl:      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:     [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function ClickHandler({ onLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocation({ lat, lng });
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

function SearchBox({ placeholder, value, onChange, onSelect, lang }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef  = useRef(null);

  const search = useCallback((q) => {
    if (q.trim().length < 3) { setResults([]); return; }
    setLoading(true);
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
    const label  = result.display_name.split(',').slice(0, 3).join(',').trim();
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
        <span className="loc-dot" style={{ background: '#1876d3' }} />
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

export default function SingleLocationPickerMap({ location, onLocation, labels }) {
  const { lang }  = useLanguage();
  const [query,     setQuery]     = useState('');
  const [flyTarget, setFlyTarget] = useState(null);

  const handleSelect = (coords) => {
    onLocation(coords);
    setQuery(coords.label || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
    setFlyTarget(coords);
  };

  const handleMapClick = (coords) => {
    onLocation(coords);
    setQuery(`${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
  };

  const cairoCenter = [30.0444, 31.2357];

  return (
    <div className="loc-picker-container">
      <div className="loc-section">
        <div className="loc-section-label">
          <span className="loc-dot" style={{ background: '#1876d3' }} />
          {labels.locationLabel}
        </div>
        <SearchBox
          placeholder={labels.locationPlaceholder}
          value={query}
          onChange={setQuery}
          onSelect={handleSelect}
          lang={lang}
        />
        {location && (
          <p className="loc-set-hint loc-set-pickup">
            {labels.locationSet}
          </p>
        )}
      </div>

      <div className="loc-map-hint">
        {!location && labels.instruction}
        {location && (
          <span className="route-info-text">
            📍 {location.label || `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
          </span>
        )}
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
        <ClickHandler onLocation={handleMapClick} />
        <FlyTo target={flyTarget} />
        {location && <Marker position={[location.lat, location.lng]} icon={locationIcon} />}
      </MapContainer>
    </div>
  );
}
