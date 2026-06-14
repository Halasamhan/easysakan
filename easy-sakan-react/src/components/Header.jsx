import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Header.css';

const translations = {
  en: {
    nav_home: "Home",
    nav_listings: "Listings",
    nav_sell: "Sell",
    nav_transport: "Transportation",
    nav_services: "Services",
    nav_contact: "Contact",
    lang_btn: "العربية",
    // Auth & Dropdown
    login: "Login",
    signup: "Sign Up",
    provider: "Provider",
    customer: "Customer",
    dashboards: "Dashboards",
    provider_dash: "Provider Dashboard",
    transport_dash: "Transportation Dashboard",
    services_dash: "Services Dashboard",
    maintenance_dash: "Maintenance Dashboard",
    seller_dash: "Seller Dashboard",
    become_seller: "Become a Seller",
    settings: "Settings",
    logout: "Logout",
    // Search
    search_placeholder: "Search properties...",
    become_partner: "Become a Partner"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_listings: "العقارات",
    nav_sell: "بيع",
    nav_transport: "النقل",
    nav_services: "الخدمات",
    nav_contact: "اتصل بنا",
    lang_btn: "English",
    // Auth & Dropdown
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    provider: "مزود خدمة",
    customer: "عميل",
    dashboards: "لوحات التحكم",
    provider_dash: "لوحة المزود",
    transport_dash: "لوحة النقل",
    services_dash: "لوحة الخدمات",
    maintenance_dash: "لوحة الصيانة",
    seller_dash: "لوحة البائع",
    become_seller: "اصبح بائعاً",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    // Search
    search_placeholder: "البحث عن عقارات...",
    become_partner: "كن شريكاً"
  }
};

function AuthActions({ t }) {
  const { user, isLoggedIn, logout, isSeller } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    setTimeout(() => document.addEventListener('click', onOutside), 0);
    return () => document.removeEventListener('click', onOutside);
  }, [open]);

  const go = (path) => { setOpen(false); navigate(path); };
  const handleLogout = useCallback(() => { setOpen(false); logout(); navigate('/login'); }, [logout, navigate]);

  if (!isLoggedIn) {
    return (
      <>
        <Link to="/login" className="btn-header-outline">
          <img src="/assets/images/login.png" alt="Login" style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'middle' }} />
          {t('login')}
        </Link>
        <Link to="/signup" className="btn-header-solid">
          <img src="/assets/images/add-user.png" alt="Sign Up" style={{ width: 18, height: 18, marginRight: 8, verticalAlign: 'middle' }} />
          {t('signup')}
        </Link>
        <Link to="/partner/signup" className="btn-header-outline" style={{ borderColor: '#1876d3', color: '#1876d3' }}>
          🤝 {t('become_partner')}
        </Link>
      </>
    );
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button className="profile-btn" onClick={() => setOpen(o => !o)} title={user?.name}>
        <span className="profile-avatar">{user?.avatar}</span>
        <span className="profile-name">{user?.name}</span>
        <span className="dropdown-arrow" style={{ display:'inline-block', transition:'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
      </button>

      {open && (
        <div className="profile-dropdown" style={{ position:'absolute', top:'calc(100% + 8px)', right:0, zIndex:9999 }}>
          <div className="dropdown-header">
            <span className="dropdown-email">{user?.email}</span>
            <span className="dropdown-role">{user?.role === 'provider' ? '🚚' : '👤'} {t(user?.role === 'provider' ? 'provider' : 'customer')}</span>
          </div>
          <hr style={{ margin: '8px 0', opacity: 0.2 }} />

          {user?.role !== 'provider' && (
            <button className="dropdown-item" onClick={() => go('/customer/dashboard')}>📊 {t('customer')}&nbsp;Dashboard</button>
          )}
          {isSeller && (
            <button className="dropdown-item" onClick={() => go('/seller/dashboard')}>🏠 {t('seller_dash')}</button>
          )}
          {!isSeller && user?.role !== 'provider' && (
            <>
              <button className="dropdown-item" onClick={() => go('/become-seller')}>📍 {t('become_seller')}</button>
              <hr style={{ margin: '8px 0', opacity: 0.2 }} />
            </>
          )}
          <button className="dropdown-item logout" onClick={handleLogout}>🚪 {t('logout')}</button>
        </div>
      )}
    </div>
  );
}

function SearchBar({ t }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form className="header-search" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder={t('search_placeholder')} 
        className="search-input" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="search-btn">🔍</button>
    </form>
  );
}

export default function Header() {
  const location   = useLocation();
  const { lang, toggleLang } = useLanguage();
  const { user, isSeller } = useAuth();

  const t = (key) => translations[lang]?.[key] || key;
  const isProvider = user?.role === 'provider';

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <header className="home-header">
      <div className="container-wide">
        <div className="header-content">
          <div className="header-logo">
            <Link to={isProvider ? '/transportation/dashboard' : '/'}>
              <img src="/assets/images/logo.png" alt="Easy sakan" className="header-logo-img" />
            </Link>
          </div>

          <nav className="header-nav">
            {isProvider ? (
              <>
                <Link to="/transportation/dashboard" className={`nav-link${location.pathname === '/transportation/dashboard' ? ' nav-link-active' : ''}`}>
                  🚛 {t('transport_dash')}
                </Link>
                <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' nav-link-active' : ''}`}>
                  {t('nav_contact')}
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className={`nav-link${location.pathname === '/' ? ' nav-link-active' : ''}`}>
                  {t('nav_home')}
                </Link>
                <Link to="/listings" className={`nav-link${location.pathname === '/listings' ? ' nav-link-active' : ''}`}>
                  {t('nav_listings')}
                </Link>
                {user && !isSeller ? (
                  <Link to="/become-seller" className={`nav-link${location.pathname === '/become-seller' ? ' nav-link-active' : ''}`}>
                    {t('become_seller')}
                  </Link>
                ) : isSeller ? (
                  <Link to="/seller" className={`nav-link${location.pathname === '/seller' ? ' nav-link-active' : ''}`}>
                    {t('nav_sell')}
                  </Link>
                ) : null}
                <Link to="/transportation" className={`nav-link${location.pathname.startsWith('/transportation') ? ' nav-link-active' : ''}`}>
                  {t('nav_transport')}
                </Link>
                <Link to="/services" className={`nav-link${location.pathname.startsWith('/services') ? ' nav-link-active' : ''}`}>
                  {t('nav_services')}
                </Link>
                <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' nav-link-active' : ''}`}>
                  {t('nav_contact')}
                </Link>
              </>
            )}
          </nav>

          <div className="header-actions">
            <button className="btn-header-outline" onClick={toggleLang} style={{ padding: '5px 10px', fontSize: '14px' }}>
              {t('lang_btn')}
            </button>
            <AuthActions t={t} />
          </div>
        </div>
      </div>
    </header>
  );
}