import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { transportationTranslations } from '../data/Transportation';

import { useAuth } from '../context/AuthContext';
import LocationPickerMap from '../components/LocationPickerMap';
import './Transportation.css';
import '../styles/booking.css';

// Helper to convert English digits to Arabic digits
const toArabicNumerals = (num) => {
  if (num === null || num === undefined) return '';
  return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
};

// Format price based on language
const formatPrice = (price, lang) => {
  if (lang === 'ar') {
    return toArabicNumerals(price);
  }
  return price;
};

export default function TransportationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lang } = useLanguage();
  const t = transportationTranslations[lang];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  // CHANGED: State now stores only IDs (strings) instead of full objects
  const [selectedServices, setSelectedServices] = useState([]);
  const [moveDate, setMoveDate] = useState('');
  const [moveTime, setMoveTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);

  const BASE_FEE    = 1000; 
  const RATE_PER_KM = 30; 

  const distanceFee = distanceKm !== null
    ? BASE_FEE + Math.round(distanceKm * RATE_PER_KM)
    : 0;

  const handlePickup = useCallback((coords) => {
    setPickupCoords(coords);
    setPickupLocation(coords.label || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
  }, []);

  const handleDropoff = useCallback((coords) => {
    setDropoffCoords(coords);
    setDropoffLocation(coords.label || `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
  }, []);

  const handleDistanceChange = useCallback((km) => {
    setDistanceKm(km);
  }, []);

  // Data from translations
  const packages = t.packages;
  const additionalServices = t.additionalServices;
  const mainServices = t.featuresList;
  const bottomFeatures = t.bottomFeatures;

  // FIXED: Toggle logic now handles only IDs
  const toggleService = (service) => {
    setSelectedServices(prev => {
      const exists = prev.includes(service.id); // Check if ID exists
      if (exists) {
        return prev.filter(id => id !== service.id); // Remove ID
      } else {
        return [...prev, service.id]; // Add ID
      }
    });
  };

  // FIXED: Clear selected services if package changes (to avoid invalid selections)
  useEffect(() => {
    setSelectedServices([]);
  }, [selectedPackage]);

  const basePrice = selectedPackage ? packages.find(p => p.id === selectedPackage).price : 0;

  // FIXED: Calculate price by looking up IDs in the CURRENT language list
  const additionalPrice = selectedServices.reduce((sum, serviceId) => {
    const serviceList = additionalServices[selectedPackage] || [];
    const service = serviceList.find(s => s.id === serviceId);
    return sum + (service ? service.price : 0);
  }, 0);

  const totalPrice = basePrice + additionalPrice + distanceFee;

  const handleBooking = async () => {
    setError('');
    const le = t.errors;

    if (!user) {
      setError(le.loginRequired);
      return;
    }
    if (!selectedPackage || !moveDate || !moveTime || !pickupCoords || !dropoffCoords) {
      setError(le.missingFields);
      return;
    }

    // Reconstruct full objects for the API payload
    const pkg = packages.find(p => p.id === selectedPackage);
    const selectedServiceObjects = selectedServices.map(id => {
       return (additionalServices[selectedPackage] || []).find(s => s.id === id);
    }).filter(Boolean);

    const payload = {
      package_name:     pkg.name,
      services:         selectedServiceObjects,
      total:            totalPrice,
      date:             moveDate,
      time:             moveTime,
      pickup_location:  pickupLocation,
      dropoff_location: dropoffLocation,
      pickup_lat:       pickupCoords.lat,
      pickup_lng:       pickupCoords.lng,
      dropoff_lat:      dropoffCoords.lat,
      dropoff_lng:      dropoffCoords.lng,
      distance_km:      distanceKm ? Math.round(distanceKm * 10) / 10 : 0,
      customer_id:      user.id,
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost/easysakan/transportation_handler.php', {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || le.genericError);
        return;
      }

      navigate('/checkout', {
        state: {
          booking: {
            type:             'transportation',
            order_id:         data.order_id,
            package:          pkg,
            services:         selectedServiceObjects,
            date:             moveDate,
            time:             moveTime,
            pickupLocation,
            dropoffLocation,
            totalPrice,
          }
        }
      });
    } catch {
      setError(le.networkError);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBooking = () => {
    document.getElementById('transportation-booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Arabic Date Formatter
  const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`transportation-page ${lang === 'ar' ? 'rtl' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <main className="transportation-main">
        <section className="transportation-hero">
          <div className="transportation-hero-wrapper">
            <div className="transportation-hero-content">
              <h1 className="transportation-hero-title">{t.hero.title}</h1>
              <p className="transportation-hero-subtitle">{t.hero.subtitle}</p>
              <button onClick={scrollToBooking} className="btn-hero-primary">{t.hero.btn}</button>
            </div>

            <div className="hero-visual">
              <div className="road-track">
                <div className="road"></div>
              </div>
              <div className="truck-icon">🚛</div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="transportation-services">
          <div className="services-container">
            <div className="services-header">
              <p>{t.servicesSection.title}</p>
            </div>

            <div className="services-grid">
              {mainServices.map((service, index) => (
                <a key={index} className="service-card" href="#transportation-booking">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Transportation Booking Section */}
        <section className="booking-section-extended" id="transportation-booking">
          <div className="container-wide">
            <div className="booking-container-extended">
              {/* Main Content */}
              <div className="booking-content-extended">
                {/* Package Selection */}
                <section className="booking-section">
                  <h2 className="section-heading">{t.booking.selectPackage}</h2>
                  <p className="section-description">{t.booking.selectPackageDesc}</p>

                  <div className="categories-grid">
                    {packages.map(pkg => (
                      <button
                        key={pkg.id}
                        className={`category-card ${selectedPackage === pkg.id ? 'active' : ''}`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        <div className="category-icon">{pkg.icon}</div>
                        <p className="category-name">{pkg.name}</p>
                        <p style={{ fontSize: '0.9rem', color: 'inherit', margin: '0.3rem 0 0' }}>
                            {t.currency} {formatPrice(pkg.price, lang)}
                        </p>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Additional Services */}
                {selectedPackage && (
                  <section className="booking-section">
                    <h2 className="section-heading">{t.booking.addServices}</h2>
                    <p className="section-description">{t.booking.addServicesDesc}</p>

                    <div className="services-options">
                      {additionalServices[selectedPackage]?.map(service => (
                        <label key={service.id} className="service-option">
                          <input
                            type="checkbox"
                            // FIXED: Check if ID exists in state
                            checked={selectedServices.includes(service.id)}
                            onChange={() => toggleService(service)}
                            className="service-checkbox"
                          />
                          <div className="service-content">
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">{t.currency} {formatPrice(service.price, lang)}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>
                )}

                {/* Location & Date Selection */}
                {selectedPackage && (
                  <section className="booking-section">
                    <h2 className="section-heading">{t.booking.moveDetails}</h2>

                    {/* Map location picker */}
                    <div className="map-picker-wrapper">
                      <LocationPickerMap
                        pickup={pickupCoords}
                        dropoff={dropoffCoords}
                        onPickup={handlePickup}
                        onDropoff={handleDropoff}
                        onDistanceChange={handleDistanceChange}
                      />

                      {distanceKm !== null && (
                        <div className="distance-badge">
                          {t.booking.distanceFeeLabel}: <strong>{t.currency} {formatPrice(distanceFee, lang)}</strong>
                          &nbsp;&bull;&nbsp;{formatPrice(BASE_FEE, lang)} {t.currency} {t.booking.baseFeeLabel} + {formatPrice(RATE_PER_KM, lang)} {t.currency}{t.booking.perKmLabel}
                        </div>
                      )}
                    </div>

                    <div className="datetime-grid" style={{ marginTop: '1.25rem' }}>
                      <div className="form-group">
                        <label className="form-label">{t.booking.dateLabel}</label>
                        <input
                          type="date"
                          value={moveDate}
                          onChange={(e) => setMoveDate(e.target.value)}
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          className="form-input"
                          dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t.booking.timeLabel}</label>
                        <select
                          value={moveTime}
                          onChange={(e) => setMoveTime(e.target.value)}
                          className="form-input"
                        >
                          <option value="">{t.booking.timePlaceholder}</option>
                          {t.booking.timeOptions.map((time, idx) => (
                            <option key={idx} value={time.value}>{time.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Booking Summary Sidebar */}
              <aside className="booking-sidebar">
                <div className="booking-summary">
                  <h3 className="summary-title">{t.summary.title}</h3>

                  {selectedPackage ? (
                    <>
                      <div className="summary-items">
                        <div className="summary-item">
                          <span className="summary-item-name">
                            {packages.find(p => p.id === selectedPackage).name}
                          </span>
                          <span className="summary-item-price">{t.currency} {formatPrice(basePrice, lang)}</span>
                        </div>
                        {/* FIXED: Map over IDs and find name in CURRENT language */}
                        {selectedServices.map(serviceId => {
                          const service = (additionalServices[selectedPackage] || []).find(s => s.id === serviceId);
                          if (!service) return null;
                          return (
                            <div key={service.id} className="summary-item">
                              <span className="summary-item-name">{service.name}</span>
                              <span className="summary-item-price">{t.currency} {formatPrice(service.price, lang)}</span>
                            </div>
                          );
                        })}
                      </div>

                      {distanceFee > 0 && (
                        <div className="summary-item">
                          <span className="summary-item-name">
                            {t.booking.distanceFeeLabel} ({formatPrice(distanceKm?.toFixed(1), lang)} km {lang === 'en' ? 'road' : 'طريق'})
                          </span>
                          <span className="summary-item-price">{t.currency} {formatPrice(distanceFee, lang)}</span>
                        </div>
                      )}

                      {moveDate && (
                        <div className="summary-details">
                          <p><strong>{t.summary.dateLabel}</strong> {getFormattedDate(moveDate)}</p>
                          {moveTime && <p><strong>{t.summary.timeLabel}</strong> {moveTime}</p>}
                          {pickupCoords  && <p><strong>{t.summary.fromLabel}</strong> {formatPrice(pickupCoords.lat.toFixed(4), lang)}, {formatPrice(pickupCoords.lng.toFixed(4), lang)}</p>}
                          {dropoffCoords && <p><strong>{t.summary.toLabel}</strong>   {formatPrice(dropoffCoords.lat.toFixed(4), lang)}, {formatPrice(dropoffCoords.lng.toFixed(4), lang)}</p>}
                        </div>
                      )}

                      <div className="summary-divider"></div>

                      <div className="summary-total">
                        <span>{t.summary.total}</span>
                        <span className="total-price">{t.currency} {formatPrice(totalPrice, lang)}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.35rem', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        {lang === 'ar' ? '* يخضع لرسوم 6٪' : '* Subject to 6% fees'}
                      </p>

                      {error && (
                        <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                          {error}
                        </p>
                      )}
                      <button
                        className="btn-book-now"
                        onClick={handleBooking}
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                      >
                        {loading ? t.summary.processing : t.summary.btn}
                      </button>
                    </>
                  ) : (
                    <div className="summary-empty">
                      <p>{t.summary.empty}</p>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}