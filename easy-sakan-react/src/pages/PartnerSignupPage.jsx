import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Adjust path as needed
import '../styles/Partnersignup.css'; // Create this CSS file for specific styles

const t = {
  en: {
    leftTitle: "Become a Partner",
    leftSubtitle: "Join EasySakan's network of trusted transport and service providers across Egypt.",
    footer: '"Grow your business with EasySakan."',
    cardTitle: "Partner Registration",
    cardSubtitle: "Fill in your details to create a partner account.",
    fname: "First Name", fnamePh: "John",
    lname: "Last Name",  lnamePh: "Doe",
    email: "Email Address", emailPh: "partner@company.com",
    cname: "Company Name", cnamePh: "e.g. Cairo Movers Co.",
    phone: "Phone Number", phonePh: "01XXXXXXXXX",
    nationalID: "National ID", nationalIDPh: "14-digit national ID",
    location: "Location", locationPh: "Select your governorate",
    partnerType: "Partner Type",
    typeTransport: "Transportation Provider",
    typeService: "Service Provider",
    serviceType: "Service Specialty",
    serviceTypePh: "Select specialty",
    pass: "Password", passPh: "Min. 6 characters",
    confirm: "Confirm Password", confirmPh: "Repeat password",
    agree: "I agree to the Terms & Conditions",
    submitBtn: "Create Partner Account",
    submittingBtn: "Creating account...",
    alreadyPartner: "Already a partner?",
    loginLink: "Partner Login",
    orDivider: "or continue with email",
    errorConn: "Connection error. Make sure XAMPP is running.",
    locations: [
      { value: 'Cairo', label: 'Cairo' },
      { value: 'Giza', label: 'Giza' },
      { value: 'Alexandria', label: 'Alexandria' },
      { value: 'New Cairo', label: 'New Cairo' },
      { value: 'New Administrative Capital', label: 'New Administrative Capital' },
      { value: '6th of October', label: '6th of October' },
      { value: 'North Coast', label: 'North Coast' },
      { value: 'Red Sea', label: 'Red Sea' },
      { value: 'South Sinai', label: 'South Sinai' },
      { value: 'Mansoura', label: 'Mansoura' },
      { value: 'Tanta', label: 'Tanta' },
      { value: 'Assiut', label: 'Assiut' },
      { value: 'Luxor', label: 'Luxor' },
      { value: 'Aswan', label: 'Aswan' },
    ],
    serviceTypes: [
      { value: 'Plumbing',    label: 'Plumbing' },
      { value: 'Electrical',  label: 'Electrical' },
      { value: 'Cleaning',    label: 'Cleaning' },
      { value: 'Painting',    label: 'Painting' },
      { value: 'Landscaping', label: 'Landscaping' },
      { value: 'Maintenance', label: 'General Maintenance' },
    ],
  },
  ar: {
    leftTitle: "كن شريكاً",
    leftSubtitle: "انضم لشبكة مزودي النقل والخدمات الموثوقين في إيزي سكن.",
    footer: '"نمّ أعمالك مع إيزي سكن."',
    cardTitle: "تسجيل شريك جديد",
    cardSubtitle: "أدخل بياناتك لإنشاء حساب شريك.",
    fname: "الاسم الأول", fnamePh: "أحمد",
    lname: "الاسم الأخير", lnamePh: "محمد",
    email: "البريد الإلكتروني", emailPh: "partner@company.com",
    cname: "اسم الشركة", cnamePh: "مثال: شركة ناقلو القاهرة",
    phone: "رقم الهاتف", phonePh: "01XXXXXXXXX",
    nationalID: "الرقم القومي", nationalIDPh: "14 رقماً",
    location: "الموقع", locationPh: "اختر المحافظة",
    partnerType: "نوع الشراكة",
    typeTransport: "مزود نقل",
    typeService: "مزود خدمات",
    serviceType: "تخصص الخدمة",
    serviceTypePh: "اختر التخصص",
    pass: "كلمة المرور", passPh: "6 أحرف على الأقل",
    confirm: "تأكيد كلمة المرور", confirmPh: "أعد كتابة كلمة المرور",
    agree: "أوافق على الشروط والأحكام",
    submitBtn: "إنشاء حساب شريك",
    submittingBtn: "جاري الإنشاء...",
    alreadyPartner: "لديك حساب شريك؟",
    loginLink: "تسجيل دخول الشركاء",
    orDivider: "أو تابع بالبريد الإلكتروني",
    errorConn: "خطأ في الاتصال. تأكد من تشغيل XAMPP.",
    locations: [
      { value: 'Cairo', label: 'القاهرة' },
      { value: 'Giza', label: 'الجيزة' },
      { value: 'Alexandria', label: 'الإسكندرية' },
      { value: 'New Cairo', label: 'القاهرة الجديدة' },
      { value: 'New Administrative Capital', label: 'العاصمة الإدارية الجديدة' },
      { value: '6th of October', label: 'السادس من أكتوبر' },
      { value: 'North Coast', label: 'الساحل الشمالي' },
      { value: 'Red Sea', label: 'البحر الأحمر' },
      { value: 'South Sinai', label: 'جنوب سيناء' },
      { value: 'Mansoura', label: 'المنصورة' },
      { value: 'Tanta', label: 'طنطا' },
      { value: 'Assiut', label: 'أسيوط' },
      { value: 'Luxor', label: 'الأقصر' },
      { value: 'Aswan', label: 'أسوان' },
    ],
    serviceTypes: [
      { value: 'Plumbing',    label: 'سباكة' },
      { value: 'Electrical',  label: 'كهرباء' },
      { value: 'Cleaning',    label: 'تنظيف' },
      { value: 'Painting',    label: 'دهانات' },
      { value: 'Landscaping', label: 'تنسيق حدائق' },
      { value: 'Maintenance', label: 'صيانة عامة' },
    ],
  },
};

export default function PartnerSignupPage() {
  const navigate  = useNavigate();
  const { lang }  = useLanguage();
  const tr        = t[lang];
  const isRTL     = lang === 'ar';

  const [form, setForm]       = useState({
    fname: '', lname: '', email: '', cname: '', phone: '',
    nationalID: '', location: '', type: '', service_type: '',
    pass: '', confirmPassword: '',
  });
  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('http://localhost/easysakan/partner_signup_handler.php', {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        navigate('/partner/login');
      } else {
        setError(data.message);
      }
    } catch {
      setError(tr.errorConn);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`auth-shell auth-template ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="auth-left">
        <h2>{tr.leftTitle}</h2>
        <p>{tr.leftSubtitle}</p>
        <footer>{tr.footer}</footer>
      </section>

      <section className="auth-right">
        <div className="auth-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🤝</span>
            <h3 style={{ margin: 0 }}>{tr.cardTitle}</h3>
          </div>
          <p>{tr.cardSubtitle}</p>

          <div className="social-row">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="social-btn"><img src="/assets/images/google.png" alt="Google" style={{ width: 30, height: 30 }} /></a>
            <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer" className="social-btn"><img src="/assets/images/apple.png" alt="Apple" style={{ width: 30, height: 30 }} /></a>
          </div>

          <div className="divider"><span>{tr.orDivider}</span></div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '6px', marginBottom: '1rem', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label>{tr.fname}</label>
                <input name="fname" type="text" placeholder={tr.fnamePh} value={form.fname} onChange={handle} required />
              </div>
              <div className="form-field">
                <label>{tr.lname}</label>
                <input name="lname" type="text" placeholder={tr.lnamePh} value={form.lname} onChange={handle} required />
              </div>
            </div>

            <label>{tr.email}</label>
            <input name="email" type="email" placeholder={tr.emailPh} value={form.email} onChange={handle} required autoComplete="off" />

            <label>{tr.cname}</label>
            <input name="cname" type="text" placeholder={tr.cnamePh} value={form.cname} onChange={handle} />

            <div className="form-row">
              <div className="form-field">
                <label>{tr.phone}</label>
                <input name="phone" type="tel" placeholder={tr.phonePh} value={form.phone} onChange={handle} />
              </div>
              <div className="form-field">
                <label>{tr.nationalID}</label>
                <input name="nationalID" type="text" placeholder={tr.nationalIDPh} value={form.nationalID} onChange={handle} maxLength={14} required />
              </div>
            </div>

            <label>{tr.location}</label>
            <select name="location" value={form.location} onChange={handle} required>
              <option value="">{tr.locationPh}</option>
              {tr.locations.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>

            <label>{tr.partnerType}</label>
            <select name="type" value={form.type} onChange={handle} required>
              <option value="">— select —</option>
              <option value="transport">{tr.typeTransport}</option>
              <option value="service">{tr.typeService}</option>
            </select>

            {form.type === 'service' && (
              <>
                <label>{tr.serviceType}</label>
                <select name="service_type" value={form.service_type} onChange={handle} required>
                  <option value="">{tr.serviceTypePh}</option>
                  {tr.serviceTypes.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </>
            )}

            {/* Password Input */}
            <label>{tr.pass}</label>
            <div style={{ position: 'relative' }}>
              <input
                name="pass"
                type={showPass ? 'text' : 'password'}
                placeholder={tr.passPh}
                value={form.pass}
                onChange={handle}
                required
                minLength={6}
                autoComplete="off"
                style={{
                  paddingRight: isRTL ? '0.85rem' : '2.8rem',
                  paddingLeft: isRTL ? '2.8rem' : '0.85rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: 'absolute', top: '50%',
                  right: isRTL ? 'auto' : '0.85rem',
                  left: isRTL ? '0.85rem' : 'auto',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                  color: '#6b7280', padding: 0, lineHeight: 1, transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center'
                }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0844AA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                {showPass ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <label>{tr.confirm}</label>
            <div style={{ position: 'relative' }}>
              <input
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder={tr.confirmPh}
                value={form.confirmPassword}
                onChange={handle}
                required
                minLength={6}
                autoComplete="off"
                style={{
                  paddingRight: isRTL ? '0.85rem' : '2.8rem',
                  paddingLeft: isRTL ? '2.8rem' : '0.85rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(p => !p)}
                style={{
                  position: 'absolute', top: '50%',
                  right: isRTL ? 'auto' : '0.85rem',
                  left: isRTL ? '0.85rem' : 'auto',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                  color: '#6b7280', padding: 0, lineHeight: 1, transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center'
                }}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0844AA'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            <div className="auth-meta">
              <label className="check-wrap">
                <input type="checkbox" required /> 
                <span>{tr.agree}</span>
              </label>
            </div>


            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              🤝 {loading ? tr.submittingBtn : tr.submitBtn}
            </button>

            <div className="form-footer">
              {tr.alreadyPartner} <Link to="/partner/login">{tr.loginLink}</Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}