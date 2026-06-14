import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const t = {
  en: {
    title: "Partner Portal",
    subtitle: "Manage your transport or service business with EasySakan.",
    footer: '"Powering Egypt\'s service providers."',
    cardTitle: "Partner Login",
    cardSubtitle: "Enter your partner credentials to continue.",
    orDivider: "or continue with email",
    emailLabel: "Email Address",
    emailPlaceholder: "partner@company.com",
    passLabel: "Password",
    passPlaceholder: "Enter your password",
    loginBtn: "Login",
    loggingInBtn: "Logging in...",
    backToCustomer: "Not a partner?",
    customerLink: "Customer Login",
    errorConnection: "Connection error. Make sure XAMPP is running."
  },
  ar: {
    title: "بوابة الشركاء",
    subtitle: "أدر أعمال النقل أو الخدمات الخاصة بك مع إيزي سكن.",
    footer: '"ندعم مزودي الخدمة في مصر."',
    cardTitle: "تسجيل دخول الشركاء",
    cardSubtitle: "أدخل بيانات شريكك للمتابعة.",
    orDivider: "أو تابع باستخدام البريد الإلكتروني",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "partner@company.com",
    passLabel: "كلمة المرور",
    passPlaceholder: "أدخل كلمة المرور",
    loginBtn: "تسجيل الدخول",
    loggingInBtn: "جاري تسجيل الدخول...",
    backToCustomer: "لست شريكاً؟",
    customerLink: "تسجيل دخول العملاء",
    errorConnection: "خطأ في الاتصال. تأكد من تشغيل XAMPP."
  }
};

export default function PartnerLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang } = useLanguage();
  const tr = t[lang];
  const isRTL = lang === 'ar';

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // --- Inline Styles derived from LoginPage.css ---
  
  const socialRowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "25px"
  };

  const socialBtnBase = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
    border: "1px solid #e2e8f0", // var(--border-color)
    borderRadius: "8px",
    background: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
    width: "100%"
  };

  const socialBtnHover = {
    backgroundColor: "#f8f9fa",
    borderColor: "#1876D3", // var(--hc-primary)
    transform: "translateY(-2px)"
  };

  const dividerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '25px',
    color: '#475569', // var(--text-gray)
    fontSize: '0.9rem'
  };

  const dividerLineStyle = {
    flex: 1,
    borderBottom: '1px solid #e2e8f0' // var(--border-color)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email').trim().toLowerCase();
    const password = formData.get('password');

    try {
      const res = await fetch('http://localhost/easysakan/partner_login_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        login(data.fname, data.partnerID, email, data.role);
        navigate(data.type === 'transport' ? '/transportation/dashboard' : '/services/dashboard');
      } else {
        setError(data.message);
      }
    } catch {
      setError(tr.errorConnection);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`auth-shell auth-template ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <section className="auth-left">
        <h2>{tr.title}</h2>
        <p>{tr.subtitle}</p>
        <footer>{tr.footer}</footer>
      </section>

      <section className="auth-right">
        <div className="auth-card">
          <h3>{tr.cardTitle}</h3>
          <p>{tr.cardSubtitle}</p>

          <div className="social-row">
            <button type="button" className="social-btn"><img src="/assets/images/google.png" alt="Google" style={{ width: 30, height: 30 }} /></button>
            <button type="button" className="social-btn"><img src="/assets/images/apple.png" alt="Apple" style={{ width: 30, height: 30 }} /></button>
          </div>

          {/* Divider - Matching LoginPage.css */}
          <div style={dividerContainerStyle}>
            <div style={dividerLineStyle}></div>
            <span style={{ padding: '0 10px' }}>{tr.orDivider}</span>
            <div style={dividerLineStyle}></div>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="partnerEmail">{tr.emailLabel}</label>
            <input id="partnerEmail" name="email" type="email" placeholder={tr.emailPlaceholder} required autoComplete="off" />

            <label htmlFor="partnerPassword">{tr.passLabel}</label>
            <div style={{ position: 'relative' }}>
              <input
                id="partnerPassword"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder={tr.passPlaceholder}
                required
                autoComplete="off"
                // RTL specific padding adjustment to avoid text overlapping icon
                style={isRTL ? { paddingLeft: '2.8rem' } : { paddingRight: '2.8rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: 'absolute', top: '50%',
                  [isRTL ? 'left' : 'right']: '0.85rem', // Dynamic side for RTL
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                  color: '#64748b', padding: 0, lineHeight: 1, transition: 'color 0.2s'
                }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1876D3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              >
                {showPass ? (
                  // Eye Off Icon
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  // Eye Icon
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? tr.loggingInBtn : tr.loginBtn}
            </button>

            <div className="form-footer">
              {tr.backToCustomer} <Link to="/login">{tr.customerLink}</Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}