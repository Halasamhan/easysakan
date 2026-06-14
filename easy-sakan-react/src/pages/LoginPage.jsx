import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { authTranslations } from '../data/Login';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang } = useLanguage();
  const t = authTranslations[lang];

  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [showPass,    setShowPass]    = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email').trim().toLowerCase();
    const password = formData.get('password');

    try {
      const response = await fetch('http://localhost/easysakan/login_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        login(data.fname, data.custID, email, data.role || 'customer');
        navigate(data.role === 'provider' ? '/transportation/dashboard' : '/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t.errorConnection);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className={`auth-shell auth-template ${lang === 'ar' ? 'rtl' : ''}`} 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <section className="auth-left">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        <footer>{t.footer}</footer>
      </section>

      <section className="auth-right">
        <div className="auth-card">
          <h3>{t.cardTitle}</h3>
          <p>{t.cardSubtitle}</p>

          <div className="social-row">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="social-btn">
              <img src="/assets/images/google.png" alt="Google" style={{ width: 30, height: 30 }} />
            </a>
            <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer" className="social-btn">
              <img src="/assets/images/apple.png" alt="Apple" style={{ width: 30, height: 30 }} />
            </a>
          </div>

          <div className="divider"><span>{t.orDivider}</span></div>

          {error && (
            <div style={{ 
              background: '#fee2e2', color: '#dc2626', padding: '12px', 
              borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' 
            }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="loginEmail">{t.emailLabel}</label>
            <input 
              id="loginEmail" 
              name="email" 
              type="email" 
              placeholder={t.emailPlaceholder} 
              required 
              // autoComplete removed here to allow email autofill
            />

            <label htmlFor="loginPassword">{t.passLabel}</label>
            <div style={{ position: 'relative' }}>
              <input
                id="loginPassword"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder={t.passPlaceholder}
                required
                autoComplete="off"
                // Dynamic padding based on language (RTL vs LTR)
                style={{
                  paddingRight: lang === 'ar' ? '0.85rem' : '2.8rem',
                  paddingLeft: lang === 'ar' ? '2.8rem' : '0.85rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: 'absolute', 
                  top: '50%', 
                  // Position changes based on language
                  right: lang === 'ar' ? 'auto' : '0.85rem',
                  left: lang === 'ar' ? '0.85rem' : 'auto',
                  transform: 'translateY(-50%)', 
                  background: 'none',
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '1.2rem',
                  color: '#64748b', 
                  padding: 0, 
                  lineHeight: 1, 
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0844AA'}
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
              {loading ? t.loggingInBtn : t.loginBtn}
            </button>

            <div className="form-footer">
              {t.noAccount} <Link to="/signup">{t.signUpLink}</Link>
            </div>

            <div className="form-footer" style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
              <span style={{ color: '#475569' }}>{lang === 'ar' ? 'شريك خدمة؟' : 'Are you a partner?'}</span>{' '}
              <Link 
                to="/partner/login" 
                style={{ color: '#0844AA', fontWeight: 700, transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#794CC5'}
                onMouseLeave={(e) => e.target.style.color = '#0844AA'}
              >
                {lang === 'ar' ? 'بوابة الشركاء' : 'Partner Login'}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}