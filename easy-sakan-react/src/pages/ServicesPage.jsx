import { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { servicesTranslations } from '../data/Services';
import SingleLocationPickerMap from '../components/SingleLocationPickerMap';

import '../styles/services.css';

import { useAuth } from '../context/AuthContext';

export default function ServicesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lang } = useLanguage();
  const t = servicesTranslations[lang];

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US'),
    [lang]
  );
  const currencyLabel = lang === 'ar' ? 'ج.م' : 'EGP';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [locationCoords, setLocationCoords] = useState(null);

  const handleLocationSelect = useCallback((coords) => {
    setLocationCoords(coords);
  }, []);

  // Data is now imported from 't'
  const services = t.servicesList;
  const serviceOptions = t.serviceOptions;

  // Helper for local error messages
  const localErrors = {
    en: {
      loginRequired:  'You must be logged in to book a service.',
      selectService:  'Please select at least one service.',
      selectDateTime: 'Please select a date and time.',
      selectLocation: 'Please select a service location on the map.',
      genericError:   'Failed to create order. Please try again.',
      networkError:   'Network error. Please check your connection and try again.'
    },
    ar: {
      loginRequired:  'يجب عليك تسجيل الدخول لحجز خدمة.',
      selectService:  'الرجاء اختيار خدمة واحدة على الأقل.',
      selectDateTime: 'الرجاء اختيار التاريخ والوقت.',
      selectLocation: 'الرجاء تحديد موقع الخدمة على الخريطة.',
      genericError:   'فشل إنشاء الطلب. يرجى المحاولة مرة أخرى.',
      networkError:   'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.'
    }
  };

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  const handleBooking = async () => {
    setError('');
    const le = localErrors[lang];

    if (!user) {
      setError(le.loginRequired);
      return;
    }
    if (selectedServices.length === 0) {
      setError(le.selectService);
      return;
    }
    if (!bookingDate || !bookingTime) {
      setError(le.selectDateTime);
      return;
    }
    if (!locationCoords) {
      setError(le.selectLocation);
      return;
    }

    const categoryName = servicesTranslations.en.servicesList.find(s => s.id === activeCategory)?.title || 'service';
    const locationLabel = locationCoords.label || `${locationCoords.lat.toFixed(5)}, ${locationCoords.lng.toFixed(5)}`;

    const payload = {
      order_type:     categoryName,
      services:       selectedServices,
      total:          totalPrice,
      date:           bookingDate,
      time:           bookingTime,
      notes:          locationLabel,
      location_label: locationLabel,
      location_lat:   locationCoords.lat,
      location_lng:   locationCoords.lng,
      customer_id:    user.id
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost/easysakan/service_handler.php', {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || le.genericError);
        return;
      }

      navigate('/checkout', {
        state: {
          booking: {
            order_id: data.order_id,
            services: selectedServices,
            date:     bookingDate,
            time:     bookingTime,
            location: locationLabel,
            total:    totalPrice
          }
        }
      });

    } catch (err) {
      setError(le.networkError);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBooking = () => {
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`services-page ${lang === 'ar' ? 'rtl' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
  

      <main className="services-main">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="container-wide">
            <div className="hero-content">
              <h1 className="hero-title">{t.cta.title}</h1>
              <p className="hero-subtitle">{t.cta.subtitle}</p>
              <button onClick={scrollToBooking} className="btn-hero-primary">{t.cta.btn}</button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-section" id="services">
          <div className="container-wide">
            <h2 className="section-title">{t.section.ourServices}</h2>
            <div className="services-grid">
              {services.map(service => (
                <div key={service.id} className={`service-card ${service.color}`}>
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <button onClick={scrollToBooking} className="service-cta">{t.cta.btn.split(' ')[0]}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="container-wide">
            <h2 className="section-title">{t.steps.title}</h2>
            <div className="steps-container">
              {[1, 2, 3].map(num => (
                <div key={num} className="step-item">
                  <div className="step-circle">{numberFormatter.format(num)}</div>
                  <h3 className="step-title">{t.steps[num].label}</h3>
                  <p className="step-description">{t.steps[num].desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="booking-section-extended" id="booking-section">
          <div className="container-wide">
            <div className="booking-container-extended">
              {/* Main Content */}
              <div className="booking-content-extended">
                {/* Category Selection */}
                <section className="booking-section">
                  <h2 className="section-heading">{t.search.title}</h2>
                  <p className="section-description">{t.search.subtitle}</p>

                  <div className="categories-grid">
                    {services.map(service => (
                      <button
                        key={service.id}
                        className={`category-card ${activeCategory === service.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(service.id)}
                      >
                        <div className="category-icon">{service.icon}</div>
                        <p className="category-name">{service.title}</p>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Service Options */}
                {activeCategory && (
                  <section className="booking-section">
                    <h2 className="section-heading">
                      {services.find(s => s.id === activeCategory).title} {t.section.ourServices}
                    </h2>
                    <p className="section-description">{t.booking.step1Sub}</p>

                    <div className="services-options">
                      {serviceOptions[activeCategory]?.map(service => (
                        <label key={service.id} className="service-option">
                          <input
                            type="checkbox"
                            checked={selectedServices.some(s => s.id === service.id)}
                            onChange={() => toggleService(service)}
                            className="service-checkbox"
                          />
                          <div className="service-content">
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">{currencyLabel} {numberFormatter.format(service.price)}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>
                )}

                {/* Date & Time Selection */}
                {selectedServices.length > 0 && (
                  <section className="booking-section">
                    <h2 className="section-heading">{t.booking.selectDate}</h2>

                    <div className="datetime-grid">
                      <div className="form-group">
                        <label className="form-label">{t.booking.selectDate.split(' ')[1]}</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t.booking.selectTime.split(' ')[1]}</label>
                        <select
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="form-input"
                        >
                          <option value="">{t.booking.step2Sub}</option>
                          {t.booking.timeSlots.map(slot => (
                            <option key={slot.value} value={slot.value}>{slot.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </section>
                )}

                {/* Location Map Picker */}
                {selectedServices.length > 0 && (
                  <section className="booking-section">
                    <h2 className="section-heading">{t.booking.locationLabel}</h2>
                    <div className="map-picker-wrapper">
                      <SingleLocationPickerMap
                        location={locationCoords}
                        onLocation={handleLocationSelect}
                        labels={t.mapPicker}
                      />
                    </div>
                  </section>
                )}
              </div>

              {/* Booking Summary Sidebar */}
              <aside className="booking-sidebar">
                <div className="booking-summary">
                  <h3 className="summary-title">{t.booking.priceEstimate}</h3>

                  {selectedServices.length > 0 ? (
                    <>
                      <div className="summary-items">
                        {selectedServices.map(service => (
                          <div key={service.id} className="summary-item">
                            <span className="summary-item-name">{service.name}</span>
                            <span className="summary-item-price">{currencyLabel} {numberFormatter.format(service.price)}</span>
                          </div>
                        ))}
                      </div>

                      {bookingDate && (
                        <div className="summary-details">
                          <p><strong>{t.booking.date}</strong> {new Date(bookingDate).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</p>
                          {bookingTime && (
                            <p>
                              <strong>{t.booking.time}</strong>{' '}
                              {t.booking.timeSlots.find(s => s.value === bookingTime)?.label || bookingTime}
                            </p>
                          )}
                          {locationCoords && (
                            <p>
                              <strong>{t.booking.location}</strong>{' '}
                              {locationCoords.label || `${locationCoords.lat.toFixed(4)}, ${locationCoords.lng.toFixed(4)}`}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="summary-divider"></div>

                      <div className="summary-total">
                        <span>{t.booking.total}</span>
                        <span className="total-price">{currencyLabel} {numberFormatter.format(totalPrice)}</span>
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
                        {loading ? (lang === 'ar' ? 'جاري المعالجة...' : 'Processing...') : t.booking.completeBooking}
                      </button>
                    </>
                  ) : (
                    <div className="summary-empty">
                      <p>{t.booking.step1Sub}</p>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container-wide">
            <h2>{t.ctaBottom.title}</h2>
            <p>{t.ctaBottom.subtitle}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">{t.ctaBottom.callUs}</Link>
              <Link to="/" className="btn-secondary">{t.ctaBottom.backHome}</Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}