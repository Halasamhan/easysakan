import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Header.css';

export default function TransportProviderHeader() {
  const navigate             = useNavigate();
  const { user, logout }     = useAuth();
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen]      = useState(false);
  const wrapRef              = useRef(null);

  const location = useLocation();
  const fname = user?.name || localStorage.getItem('hf_fname') || 'P';

  useEffect(() => {
    if (!open) return;
    const onOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    setTimeout(() => document.addEventListener('click', onOutside), 0);
    return () => document.removeEventListener('click', onOutside);
  }, [open]);

  const handleLogout = useCallback(() => {
    setOpen(false);
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <header className="home-header">
      <div className="container-wide">
        <div className="header-content">

          <div className="header-logo">
            <Link to="/transportation/dashboard">
              <img src="/assets/images/logo.png" alt="EasySakan" className="header-logo-img" />
            </Link>
          </div>

          <nav className="header-nav">
            <Link to="/transportation/dashboard" className={`nav-link${location.pathname === '/transportation/dashboard' ? ' nav-link-active' : ''}`}>
              🚛 {lang === 'ar' ? 'لوحة النقل' : 'Transportation Dashboard'}
            </Link>
            <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' nav-link-active' : ''}`}>
              {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
            </Link>
          </nav>

          <div className="header-actions">
            <button className="btn-header-outline" onClick={toggleLang} style={{ padding: '5px 10px', fontSize: '14px' }}>
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>

            <div ref={wrapRef} style={{ position: 'relative' }}>
              <button className="profile-btn" onClick={() => setOpen(o => !o)}>
                <span className="profile-avatar">{fname[0].toUpperCase()}</span>
                <span className="profile-name">{fname}</span>
                <span className="dropdown-arrow" style={{ display: 'inline-block', transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>

              {open && (
                <div className="profile-dropdown" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 9999 }}>
                  <div className="dropdown-header">
                    <span className="dropdown-email">{user?.email}</span>
                    <span className="dropdown-role">🚚 {lang === 'ar' ? 'مزود نقل' : 'Transport Provider'}</span>
                  </div>
                  <hr style={{ margin: '8px 0', opacity: 0.2 }} />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    🚪 {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
