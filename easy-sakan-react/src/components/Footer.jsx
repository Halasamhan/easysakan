import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations as footerTranslations } from '../data/Footer';
import '../styles/footer.css';

export default function Footer() {
  const { lang } = useLanguage();
  const t = footerTranslations[lang];

  return (
    <footer
      className="app-footer"
      dir={t.direction}
    
    >
      <div className="footer-wrapper">
        {/* About Section */}
        <div className="footer-section">
          <div className="footer-brand">
            <h3>{t.footer_brand}</h3>
            <p>{t.footer_desc}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h4>{t.footer_nav}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.nav_home}
              </Link>
            </li>
            <li>
              <Link to="/listings" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.nav_listings}
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.nav_services}
              </Link>
            </li>
            <li>
              <Link to="/transportation" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.nav_transport}
              </Link>
            </li>
           
          </ul>
        </div>

        {/* About & Information */}
        <div className="footer-section">
          <h4>{t.footer_about}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.about_us}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h4>{t.footer_contact}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/help" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.help_center}
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.contact_us}
              </Link>
            </li>
            <li>{t.address}</li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="footer-section">
          <h4>{t.footer_legal}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.privacy_policy}
              </Link>
            </li>
            <li>
              <Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {t.terms_conditions}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>{t.footer_social}</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
              f
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
              𝕏
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
              📷
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              in
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>{t.copyright}</p>
        <p>{t.made_in}</p>
      </div>
    </footer>
  );
}