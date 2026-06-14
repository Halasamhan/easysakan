import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/booking.css';
// Import the external data
import { translations, categories, serviceOptions } from '../data/booking';

export default function BookingPage() {
  const navigate = useNavigate();
  
  // Language State with Persistence
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  // Save language to local storage when it changes
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  // Get current language translations
  const t = translations[lang];

  // Helper for dynamic Time Options
  const timeSlots = [
    { start: 8, end: 10 },
    { start: 10, end: 12 },
    { start: 12, end: 14 },
    { start: 14, end: 16 },
    { start: 16, end: 18 }
  ];

  const formatTime = (hour, minute = "00") => {
    const h = hour % 12 || 12;
    const displayH = h < 10 ? `0${h}` : h;
    const period = hour < 12 ? t.am : t.pm;
    return `${displayH}:${minute} ${period}`;
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

  const handleBooking = () => {
    if (selectedServices.length === 0 || !bookingDate || !bookingTime) {
      alert(t.alert);
      return;
    }

    // IMPORTANT: Convert name object to string for the next page
    const cleanServices = selectedServices.map(service => ({
      ...service,
      name: service.name[lang] 
    }));

    navigate('/checkout', {
      state: {
        booking: {
          services: cleanServices,
          date: bookingDate,
          time: bookingTime,
          notes: document.querySelector('.form-textarea')?.value || ''
        }
      }
    });
  };

  return (
    <div 
      className={`booking-page ${lang === 'ar' ? 'rtl' : ''}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Add Cairo font link dynamically if needed */}
      {lang === 'ar' && (
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      )}

      <main className="booking-main">
        {/* Hero Section */}
        <section className="booking-hero">
          <div className="container-wide" style={{ position: 'relative' }}>
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              style={{
                position: 'absolute',
                top: '0',
                right: lang === 'ar' ? 'auto' : '0',
                left: lang === 'ar' ? '0' : 'auto',
                padding: '8px 16px',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                border: '1px solid #fff',
                borderRadius: '4px',
                zIndex: 10,
                fontWeight: 'bold'
              }}
            >
              {lang === 'en' ? '🇺🇸 English' : '🇸🇦 العربية'}
            </button>

            <h1 className="booking-title">{t.heroTitle}</h1>
            <p className="booking-subtitle">{t.heroSubtitle}</p>
          </div>
        </section>

        <div className="container-wide">
          <div className="booking-container">
            {/* Main Content */}
            <div className="booking-content">
              {/* Category Selection */}
              <section className="booking-section">
                <h2 className="section-heading">{t.sectionHeading}</h2>
                <p className="section-description">{t.sectionDesc}</p>

                <div className="categories-grid">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <div className="category-icon">{category.icon}</div>
                      {/* Use [lang] to select correct language */}
                      <p className="category-name">{category.name[lang]}</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* Service Options */}
              {activeCategory && (
                <section className="booking-section">
                  <h2 className="section-heading">
                    {categories.find(c => c.id === activeCategory).name[lang]} {t.servicesLabel}
                  </h2>
                  <p className="section-description">{t.selectServices}</p>

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
                          {/* Use [lang] to select correct language */}
                          <span className="service-name">{service.name[lang]}</span>
                          <span className="service-price">{t.currency} {service.price}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* Date & Time Selection */}
              {selectedServices.length > 0 && (
                <section className="booking-section">
                  <h2 className="section-heading">{t.whenNeeded}</h2>

                  <div className="datetime-grid">
                    <div className="form-group">
                      <label className="form-label">{t.selectDate}</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t.selectTime}</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="form-input"
                      >
                        <option value="">{t.chooseTime}</option>
                        {/* Map through time slots for translation */}
                        {timeSlots.map(slot => (
                          <option key={slot.start} value={`${formatTime(slot.start)} - ${formatTime(slot.end)}`}>
                            {formatTime(slot.start)} - {formatTime(slot.end)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>
              )}

              {/* Additional Info */}
              {selectedServices.length > 0 && (
                <section className="booking-section">
                  <h2 className="section-heading">{t.additionalInfo}</h2>
                  <textarea
                    placeholder={t.placeholder}
                    className="form-textarea"
                    rows="4"
                  />
                </section>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <aside className="booking-sidebar">
              <div className="booking-summary">
                <h3 className="summary-title">{t.summaryTitle}</h3>

                {selectedServices.length > 0 ? (
                  <>
                    <div className="summary-items">
                      {selectedServices.map(service => (
                        <div key={service.id} className="summary-item">
                          {/* Use [lang] to select correct language */}
                          <span className="summary-item-name">{service.name[lang]}</span>
                          <span className="summary-item-price">{t.currency} {service.price}</span>
                        </div>
                      ))}
                    </div>

                    {bookingDate && (
                      <div className="summary-details">
                        <p><strong>{t.date}:</strong> {new Date(bookingDate).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}</p>
                        {bookingTime && <p><strong>{t.time}:</strong> {bookingTime}</p>}
                      </div>
                    )}

                    <div className="summary-divider"></div>

                    <div className="summary-total">
                      <span>{t.total}:</span>
                      <span className="total-price">{t.currency} {totalPrice}</span>
                    </div>

                    <button className="btn-book-now" onClick={handleBooking}>
                      {t.bookNow}
                    </button>
                  </>
                ) : (
                  <div className="summary-empty">
                    <p>{t.emptySummary}</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}