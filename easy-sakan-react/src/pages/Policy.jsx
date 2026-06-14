import { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext'; 
import { policyTranslations } from '../data/Policy'; 

import '../styles/Policy.css';

export default function PolicyPage() {
  const { lang } = useLanguage(); 
  const t = policyTranslations[lang];
  
  const [activeTab, setActiveTab] = useState('privacy');

  // FIX: Update global document direction just like SellerHub does
  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  // Update document title dynamically
  useEffect(() => {
    document.title = t.title;
  }, [lang, t.title]);

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy':
        return (
          <div className="policy-content fade-in">
            <h2>{t.tabs.privacy}</h2>
            <p className="last-updated">{t.privacy.lastUpdated}</p>
            
            <h3>{t.privacy.title1}</h3>
            <p>{t.privacy.intro1}</p>
            <ul>
              <li><strong>{t.privacy.contactInfo}</strong> {t.privacy.contactData}</li>
              <li><strong>{t.privacy.locationInfo}</strong> {t.privacy.locationData}</li>
              <li><strong>{t.privacy.paymentInfo}</strong> {t.privacy.paymentData}</li>
            </ul>

            <h3>{t.privacy.title2}</h3>
            <p>{t.privacy.intro2}</p>
            <ul>
              <li>{t.privacy.use1}</li>
              <li>{t.privacy.use2}</li>
              <li>{t.privacy.use3}</li>
            </ul>

            <h3>{t.privacy.title3}</h3>
            <p>{t.privacy.storageText}</p>
          </div>
        );

      case 'cookies':
        return (
          <div className="policy-content fade-in">
            <h2>{t.tabs.cookies}</h2>
            <p>{t.cookies.intro}</p>
            
            <h3>{t.cookies.title1}</h3>
            <p>{t.cookies.intro1}</p>

            <h3>{t.cookies.title2}</h3>
            <div className="policy-list-group">
              <div className="list-item">
                <strong>{t.cookies.essential}</strong>
                <span>{t.cookies.essentialText}</span>
              </div>
              <div className="list-item">
                <strong>{t.cookies.functional}</strong>
                <span>{t.cookies.functionalText}</span>
              </div>
              <div className="list-item">
                <strong>{t.cookies.analytics}</strong>
                <span>{t.cookies.analyticsText}</span>
              </div>
            </div>

            <h3>{t.cookies.title3}</h3>
            <p>{t.cookies.manageText}</p>
          </div>
        );

      case 'refund':
        return (
          <div className="policy-content fade-in">
            <h2>{t.tabs.refund}</h2>
            <p>{t.refund.intro}</p>
            
            <div className="policy-card highlight">
              <h3>{t.refund.fullTitle}</h3>
              <p>{t.refund.fullText}</p>
            </div>

            <div className="policy-card warning">
              <h3>{t.refund.partialTitle}</h3>
              <p>{t.refund.partialText}</p>
            </div>

            <div className="policy-card info">
              <h3>{t.refund.noRefundTitle}</h3>
              <p>{t.refund.noRefundText}</p>
            </div>

            <h3>{t.refund.requestTitle}</h3>
            <p>{t.refund.requestText}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    // FIX: Removed inline dir attribute because useEffect handles the global dir
    <div className="policy-wrapper">
      <main className="policy-main">
        <div className="policy-container">
          {/* Header Section */}
          <section className="policy-header">
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </section>

          {/* Tabs */}
          <div className="policy-tabs">
            <button 
              className={`tab ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              {t.tabs.privacy}
            </button>
            <button 
              className={`tab ${activeTab === 'cookies' ? 'active' : ''}`}
              onClick={() => setActiveTab('cookies')}
            >
              {t.tabs.cookies}
            </button>
            <button 
              className={`tab ${activeTab === 'refund' ? 'active' : ''}`}
              onClick={() => setActiveTab('refund')}
            >
              {t.tabs.refund}
            </button>
          </div>

          {/* Content Area */}
          <div className="policy-content-wrapper">
            {renderContent()}
          </div>

          {/* Contact Box */}
          <section className="policy-contact">
            <h3>{t.contact.title}</h3>
            <p>{t.contact.subtitle}</p>
            <a href="mailto:privacy@moving.com" className="btn-support">{t.contact.button}</a>
          </section>
        </div>
      </main>
    </div>
  );
}