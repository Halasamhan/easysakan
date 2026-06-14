import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import Context

// Import Translation Data to look up fresh names
import { transportationTranslations } from '../data/Transportation';
import { servicesTranslations } from '../data/Services';

import '../styles/checkout.css';

const translations = {
  en: {
    stepDetails: "Details",
    stepSchedule: "Schedule",
    stepConfirm: "Confirm",
    reviewHeading: "Review & Secure Your Booking",
    reviewDesc: "Your professional guardian is ready to protect your home. Please verify the details below.",
    movingPackage: "MOVING PACKAGE",
    pickupLoc: "PICKUP LOCATION",
    dropoffLoc: "DROPOFF LOCATION",
    dateAndTime: "DATE & TIME",
    booked: "BOOKED",
    serviceType: "SERVICE TYPE",
    location: "LOCATION",
    professionalService: "Professional Service",
    
    paymentHeading: "Secure Payment",
    cardholderName: "CARDHOLDER NAME",
    cardNumber: "CARD NUMBER",
    expiryDate: "EXPIRY DATE",
    cvv: "CVV",
    payNow: "Book & Pay Now",
    processing: "Processing...",
    securityInfo: "Your payment is secure and encrypted with SSL protection",
    
    summaryTitle: "Estimated Investment",
    serviceFee: "Service Fee",
    total: "TOTAL",
    backToSchedule: "← Back to Scheduling",
    
    guaranteeTitleSafe: "Safe Delivery Guarantee",
    guaranteeTitleService: "100% Satisfaction Guarantee",
    guaranteeTextSafe: "Your items arrive safely. We guarantee secure handling and on-time delivery of your belongings.",
    guaranteeTextService: "Our work is backed by a full satisfaction guarantee. We stand behind our quality of service.",
    
    help: "Help & FAQ",
    cancel: "Cancel Booking",
    
    alertFillDetails: "Please fill in all payment details",
    alertSuccess: "Payment successful! Your booking is confirmed."
  },
  ar: {
    stepDetails: "التفاصيل",
    stepSchedule: "المواعيد",
    stepConfirm: "تأكيد",
    reviewHeading: "مراجعة وتأمين الحجز",
    reviewDesc: "المحترفون لدينا جاهزون لحماية منزلك. يرجى التحقق من التفاصيل أدناه.",
    movingPackage: "باقة التنقل",
    pickupLoc: "موقع الاستلام",
    dropoffLoc: "موقع التسليم",
    dateAndTime: "التاريخ والوقت",
    booked: "تم الحجز",
    serviceType: "نوع الخدمة",
    location: "الموقع",
    professionalService: "خدمة احترافية",

    paymentHeading: "دفع آمن",
    cardholderName: "اسم حامل البطاقة",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "رمز الأمان",
    payNow: "احجز وادفع الآن",
    processing: "جاري المعالجة...",
    securityInfo: "دفعك آمن ومشفر بواسطة حماية SSL",

    summaryTitle: "التكلفة المقدرة",
    serviceFee: "رسوم الخدمة",
    total: "المجموع",
    backToSchedule: "← العودة للمواعيد",

    guaranteeTitleSafe: "ضمان التسليم الآمن",
    guaranteeTitleService: "ضمان الرضا بنسبة 100٪",
    guaranteeTextSafe: "تصل أغراضك بأمان. نحن نضمن التعامل الآمن والتسليم في الوقت المحدد لممتلكاتك.",
    guaranteeTextService: "عملنا مدعوم بضمان الرضا الكامل. نقف خلف جودة خدمتنا.",

    help: "مساعدة والأسئلة الشائعة",
    cancel: "إلغاء الحجز",

    alertFillDetails: "يرجى ملء جميع تفاصيل الدفع",
    alertSuccess: "تم الدفع بنجاح! تم تأكيد حجزك."
  }
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage(); // Use Language Context
  
  // Fallback if state is lost
  const bookingData = location.state?.booking || {
    services: [],
    date: '',
    time: '',
    notes: '',
    type: 'service' // Default
  };

  const t = translations[lang];
  const currency = lang === 'ar' ? 'ج.م' : 'EGP';
  
  // Get current language data objects for dynamic lookup
  const tTransport = transportationTranslations[lang];
  const tServices = servicesTranslations[lang];

  // Helper to convert numbers to Arabic numerals
  const toArabicNum = (number) => {
    if (!number && number !== 0) return '';
    if (lang === 'en') return number;
    return number.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };

  // Helper to find service details dynamically based on ID
  const getServiceDetails = (serviceObj) => {
    if (!serviceObj) return { name: 'Service', price: 0 };
    const id = typeof serviceObj === 'string' ? serviceObj : serviceObj.id;

    // 1. Check Transportation
    if (bookingData.type === 'transportation' && bookingData.package) {
      const pkgId = typeof bookingData.package === 'string' ? bookingData.package : bookingData.package.id;
      const list = tTransport.additionalServices[pkgId];
      if (list) {
        const found = list.find(s => s.id === id);
        if (found) return found;
      }
    }

    // 2. Check Services (Brute force keys if category unknown)
    const serviceKeys = Object.keys(tServices.serviceOptions);
    for (const key of serviceKeys) {
      const list = tServices.serviceOptions[key];
      const found = list.find(s => s.id === id);
      if (found) return found;
    }

    return { name: 'Unknown Service', price: 0 };
  };

  // Helper to get package details dynamically
  const getPackageDetails = () => {
    if (!bookingData.package) return { name: 'Package', price: 0 };
    const id = typeof bookingData.package === 'string' ? bookingData.package : bookingData.package.id;
    return tTransport.packages.find(p => p.id === id) || { name: 'Package', price: 0 };
  };

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Total dynamically using fresh prices
  const packagePrice = bookingData.type === 'transportation' ? getPackageDetails().price : 0;
  const servicesPrice = bookingData.services?.reduce((sum, service) => {
    const details = getServiceDetails(service);
    return sum + (details.price || 0);
  }, 0) || 0;
  
  const servicesFee = Math.round((packagePrice + servicesPrice) * 0.1);
  const estimatedTotal = packagePrice + servicesPrice + servicesFee;

  const formatCardNumber = (value) => {
    // Strip everything except digits, then group into blocks of 4
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const blockNonNumeric = (e) => {
    // Allow: digits, Backspace, Delete, Tab, Enter, Escape, arrows, Home, End, Ctrl/Cmd combos
    const allowed = [
      'Backspace','Delete','Tab','Enter','Escape',
      'ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
      'Home','End',
    ];
    if (allowed.includes(e.key)) return;
    if ((e.ctrlKey || e.metaKey) && ['a','c','v','x','z'].includes(e.key.toLowerCase())) return;
    // Block anything that isn't a digit
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
      alert(t.alertFillDetails);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert(t.alertSuccess);
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };

  // Date Locale Helper
  const getFormattedDate = (dateStr) => {
    if (!dateStr) return lang === 'ar' ? 'التاريخ: غير محدد' : 'Date TBA';
    return new Date(dateStr).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className={`checkout-page ${lang === 'ar' ? 'rtl' : ''}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ fontFamily: lang === 'ar' ? "'Cairo', sans-serif" : "inherit" }}
    >
      
      {/* Font Link (kept for safety, but usually in index.html) */}
      {lang === 'ar' && (
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
      )}

      <main className="checkout-main">
        {/* Progress Steps */}
        <div className="container-wide">
          <div className="progress-steps">
            <div className="step completed">
              <div className="step-number">{toArabicNum(1)}</div>
              <p className="step-label">{t.stepDetails}</p>
            </div>
            <div className="step-divider"></div>
            <div className="step completed">
              <div className="step-number">{toArabicNum(2)}</div>
              <p className="step-label">{t.stepSchedule}</p>
            </div>
            <div className="step-divider"></div>
            <div className="step active">
              <div className="step-number">{toArabicNum(3)}</div>
              <p className="step-label">{t.stepConfirm}</p>
            </div>
          </div>
        </div>

        <div className="container-wide">
          <div className="checkout-container">
            {/* Left Column - Review & Payment */}
            <div className="checkout-left">
              {/* Review Section */}
              <section className="checkout-section">
                <h2 className="checkout-heading">{t.reviewHeading}</h2>
                <p className="checkout-description">{t.reviewDesc}</p>

                {/* Booking Details */}
                <div className="booking-details">
                  {bookingData.type === 'transportation' ? (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">{t.movingPackage}</span>
                        {/* Use getPackageDetails for dynamic translation */}
                        <p className="detail-value">{getPackageDetails().name}</p>
                        <span className="service-badge">{t.booked}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">{t.pickupLoc}</span>
                        <p className="detail-value">{bookingData.pickupLocation || t.pickupLoc}</p>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">{t.dropoffLoc}</span>
                        <p className="detail-value">{bookingData.dropoffLocation || t.dropoffLoc}</p>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">{t.dateAndTime}</span>
                        <p className="detail-value">
                          {getFormattedDate(bookingData.date)} • {bookingData.time || (lang === 'ar' ? 'الوقت: غير محدد' : 'Time TBA')}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">{t.serviceType}</span>
                        <p className="detail-value">
                          {bookingData.services && bookingData.services.length > 0 
                            ? getServiceDetails(bookingData.services[0]).name
                            : t.professionalService}
                        </p>
                        <span className="service-badge">{t.booked}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">{t.location}</span>
                        <p className="detail-value">
                          {bookingData.address || '4829 Archway Drive, Suite 100'}
                        </p>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">{t.dateAndTime}</span>
                        <p className="detail-value">
                          {getFormattedDate(bookingData.date)} • {bookingData.time || '09:00 AM'}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Secure Payment Section */}
                <div className="secure-payment-section">
                  <h3 className="section-title">{t.paymentHeading}</h3>

                  <form className="payment-form" onSubmit={handlePayment}>
                    <div className="form-group">
                      <label className="form-label">{t.cardholderName}</label>
                      <input
                        type="text"
                        placeholder="John A. Guardian"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{t.cardNumber}</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9\s]*"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        onKeyDown={blockNonNumeric}
                        maxLength="19"
                        className="form-input"
                        autoComplete="cc-number"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">{t.expiryDate}</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM / YY"
                          value={expiryDate}
                          onChange={handleExpiryChange}
                          maxLength="5"
                          className="form-input"
                          autoComplete="cc-exp"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t.cvv}</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="123"
                          value={cvv}
                          onChange={handleCvvChange}
                          maxLength="3"
                          className="form-input"
                          autoComplete="cc-csc"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-pay-now"
                    >
                      {isProcessing ? t.processing : t.payNow}
                      <span className="icon-arrow">{lang === 'ar' ? '←' : '→'}</span>
                    </button>
                  </form>

                  <p className="security-info">
                    <span className="security-icon">🔒</span>
                    {t.securityInfo}
                  </p>
                </div>
              </section>
            </div>

            {/* Right Column - Summary & Guarantee */}
            <aside className="checkout-right">
              {/* Investment Summary */}
              <div className="investment-summary">
                <h3 className="summary-title">{t.summaryTitle}</h3>

                <div className="summary-items">
                  {bookingData.type === 'transportation' ? (
                    <>
                      {bookingData.package && (
                        <div className="summary-row">
                          <span className="summary-label">{getPackageDetails().name}</span>
                          <span className="summary-price">{currency} {toArabicNum(getPackageDetails().price)}</span>
                        </div>
                      )}
                      {bookingData.services && bookingData.services.map((service, idx) => {
                        const details = getServiceDetails(service);
                        return (
                          <div key={idx} className="summary-row">
                            <span className="summary-label">{details.name}</span>
                            <span className="summary-price">{currency} {toArabicNum(details.price)}</span>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {bookingData.services && bookingData.services.map((service, idx) => {
                        const details = getServiceDetails(service);
                        return (
                          <div key={idx} className="summary-row">
                            <span className="summary-label">{details.name}</span>
                            <span className="summary-price">{currency} {toArabicNum(details.price)}</span>
                          </div>
                        );
                      })}

                      {(!bookingData.services || bookingData.services.length === 0) && (
                        <div className="summary-row">
                          <span className="summary-label">{t.professionalService}</span>
                          <span className="summary-price">{currency} {toArabicNum(1500)}</span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="summary-row">
                    <span className="summary-label">{t.serviceFee}</span>
                    <span className="summary-price">{currency} {toArabicNum(servicesFee)}</span>
                  </div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>{t.total}</span>
                  <span>{currency} {toArabicNum(estimatedTotal)}</span>
                </div>

               <button 
  className="btn-back-to-schedule"
  onClick={() => {
    // Determine which page to go back to based on booking type
    const targetRoute = bookingData.type === 'transportation' ? '/transportation' : '/services';
    navigate(targetRoute);
    // Force scroll to top immediately
    window.scrollTo(0, 0);
  }}
  style={{ cursor: 'pointer' }}
>
  {t.backToSchedule}
</button>
              </div>

              {/* Guarantee Section */}
              <div className="guarantee-section">
                <div className="guarantee-badge">
                  <span className="badge-icon">✓</span>
                </div>
                <h4 className="guarantee-title">
                  {bookingData.type === 'transportation' ? t.guaranteeTitleSafe : t.guaranteeTitleService}
                </h4>
                <p className="guarantee-text">
                  {bookingData.type === 'transportation' 
                    ? t.guaranteeTextSafe
                    : t.guaranteeTextService}
                </p>
              </div>

                          {/* Additional Links */}
              <div className="footer-links">
                {/* Help & FAQ -> Directs to /help route */}
                <a 
                  href="#help" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/help');
                  }}
                >
                  {t.help}
                </a>

                {/* Cancel Booking -> Directs to Top of Services Page */}
                <a 
                  href="#cancel" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/services');
                  }}
                >
                  {t.cancel}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}