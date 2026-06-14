
import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { contactTranslations } from '../data/Contact_translate';

import '../styles/ContactUs.css';

const Team = ({ lang, translations }) => (
  <section className="about-section">
    <div className="container center-header">
      <h2>{translations[lang]?.team_title}</h2>

      <div className="team-grid">
        {translations.team && translations.team.length > 0 ? (
          translations.team.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.img} alt={member.name_en} />
              <h4>{member[`name_${lang}`]}</h4>
              <p>{member[`role_${lang}`]}</p>
            </div>
          ))
        ) : null}
      </div>
    </div>
  </section>
);

const ContactUs = () => {
  const { lang } = useLanguage();
  const t = contactTranslations[lang];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`contact-wrapper ${lang === 'ar' ? 'rtl' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* Main Contact Section - Wider */}
      <main className="main-container">
        <section className="left-panel">
          <div className="left-content">
            <h1 className="left-title">{t.heroTitle}</h1>
            <p className="left-subtitle">{t.heroSubtitle}</p>

            <div className="contact-list">
              <div className="contact-item">
                <div className="icon-box">
                   <img src="https://i.pinimg.com/1200x/ee/bb/d6/eebbd65108cbd4be7ab1d5d547dae880.jpg"></img>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contact-text">
                  <h4>{t.callUsLabel}</h4>
                  <p><a href={`tel:${t.phoneNumber}`}>{t.phoneNumber}</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon-box">
                  <img src="https://i.pinimg.com/1200x/af/e7/e0/afe7e012fae32cfeaa8f715a1796da7d.jpg" alt="Email Icon"></img>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h4>{t.emailUsLabel}</h4>
                  <p><a href={`mailto:${t.emailAddress}`}>{t.emailAddress}</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Team Section */}
      <Team lang={lang} translations={contactTranslations} />

    </div>
  );
};

export default ContactUs;
