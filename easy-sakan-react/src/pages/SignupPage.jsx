import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; // Import Language Context
import { SignupTranslations } from '../data/Signup'; // Import Translation Data



export default function SignupPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage(); // Get current language
  const t = SignupTranslations[lang]; // Select translation object
  const isRTL = lang === 'ar';

  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const fname = String(formData.get('firstName') || '').trim();
    const lname = String(formData.get('lastName') || '').trim();
    const email = String(formData.get('email') || '').trim().toLowerCase();
    const pass = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');
    const location = String(formData.get('governorate') || '');

    try {
      const response = await fetch('http://localhost/easysakan/signup_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fname, lname, email, pass, confirmPassword, location })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(t.errorConnection); // Use translated error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`auth-shell auth-template ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="auth-left">
        <img src="/assets/images/logo.png" alt="Easy Sakan" className="auth-left-logo" />
        <h2>{t.signupIntroTitle}</h2>
        <p>{t.signupIntroText}</p>
        <footer>{t.footer}</footer>
      </section>

      <section className="auth-right">
        <div className="auth-card">
          <h3>{t.signupTitle}</h3>
          <p>{t.signupSubtitle}</p>

          <div className="social-row">
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="social-btn"><img src="/assets/images/google.png" alt="Google" style={{ width: 30, height: 30, verticalAlign: 'middle' }} /></a>
            <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer" className="social-btn"><img src="/assets/images/apple.png" alt="Apple" style={{ width: 30, height: 30, verticalAlign: 'middle' }} /></a>
          </div>

          <div className="divider"><span>{t.orDivider}</span></div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="signupFirstName">{t.firstNameLabel}</label>
                <input id="signupFirstName" name="firstName" type="text" placeholder={t.firstNamePlaceholder} required />
              </div>
              <div className="form-field">
                <label htmlFor="signupLastName">{t.lastNameLabel}</label>
                <input id="signupLastName" name="lastName" type="text" placeholder={t.lastNamePlaceholder} required />
              </div>
            </div>

            <label htmlFor="signupEmail">{t.emailLabel}</label>
            <input id="signupEmail" name="email" type="email" placeholder={t.emailPlaceholder} required autoComplete="off" />

            <label htmlFor="signupPassword">{t.passLabel}</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signupPassword"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder={t.passwordPlaceholder}
                required
                minLength="6"
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
                  border: 'none', cursor: 'pointer', fontSize: '1.1rem',
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

            <label htmlFor="signupConfirm">{t.confirmPasswordLabel}</label>
            <div style={{ position: 'relative' }}>
              <input
                id="signupConfirm"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                placeholder={t.confirmPasswordPlaceholder}
                required
                minLength="6"
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
                  border: 'none', cursor: 'pointer', fontSize: '1.1rem',
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

            <label htmlFor="signupPhone">{t.phoneLabel}</label>
            <input id="signupPhone" name="phone" type="tel" placeholder={t.phonePlaceholder} />

            <label htmlFor="governorate">{t.governorateLabel}</label>
            <select id="governorate" name="governorate" required>
              <option value="">{t.selectGovPlaceholder}</option>
              {/* Dynamically render governorates based on language */}
              {t.governorates.map((gov) => (
                <option key={gov.value} value={gov.value}>{gov.label}</option>
              ))}
            </select>

            <div className="auth-meta">
              <label className="check-wrap"><input type="checkbox" required /> {t.agreeTerms}</label>
              <Link to="/login">{t.alreadyRegistered}</Link>
            </div>

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              <img src="/assets/images/add-user.png" alt="Sign Up" style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'middle' }} />
              {loading ? t.signingUpBtn : t.signUpBtn}
            </button>
          </form>

          <p className="switch-text">
            {t.alreadyRegistered}{' '}
            <Link to="/login">
              <img src="/assets/images/login.png" alt="Login" style={{ width: 16, height: 16, marginRight: 5, verticalAlign: 'middle' }} />
              {t.loginBtn} {/* Assuming you want "Login" text here as well, or specific key */}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}