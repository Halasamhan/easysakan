import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations as aboutTranslations, } from '../data/about';
import '../styles/AboutPage.css';

// =========================================
// HELPER: Arabic Number Converter
// =========================================
const toArabicNum = (number) => {
  return String(number).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
};


// =========================================
// MAIN COMPONENT
// =========================================
export default function AboutPage() {
  const { lang } = useLanguage();
  const t = aboutTranslations[lang];
  const translations = aboutTranslations;

  return (
    <div className="about-wrapper" dir={t.direction}>
      {/* 1. MOVE HERO HERE (Outside main) */}
      <Hero t={t} />

      <main className="about-main">
        <Mission t={t} />
        <Services lang={lang} translations={translations} />
        <Values t={t} />
        <Team lang={lang} translations={translations} />
      </main>
    </div>
  );
}


// =========================================
// SUB-COMPONENTS
// =========================================
const Hero = ({ t }) => (
  <section className="about-hero">
    <div className="hero-overlay"></div>
    <div className="hero-content">
      <h1>{t.hero_title}</h1>
      <p>{t.hero_desc}</p>
      <Link to="/" className="btn-hero">
        {t.hero_btn}
      </Link>
    </div>
  </section>
);

const Mission = ({ t }) => (
  <section className="about-section">
    <div className="container center-header">
      <h2>{t.mission_title}</h2>
      <p>{t.mission_desc}</p>
    </div>
  </section>
);

const Services = ({ lang, translations }) => (
  <section className="about-section about-services-section">
    <div className="container center-header">
      <h2>{translations[lang].services_title}</h2>

      <div className="services-detail-grid">
        {translations.services.map((service, index) => (
          <div key={index} className="service-item-card">
            <div className={`service-icon-box ${service.color}`}>
              <i className={service.icon} style={{ fontSize: '32px' }}></i>
            </div>

            <div className="service-text-content">
              <h3>{service[lang].title}</h3>
              <p>{service[lang].desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);



const Values = ({ t }) => (
  <section className="about-section about-values">
    <div className="container center-header">
      <h2>{t.values_title}</h2>

      {/* Added values-grid wrapper for side-by-side columns */}
      <div className="values-grid">
        <div className="value-card">
          <div className="value-icon">
            <i className="ri-checkbox-circle-line"></i>
          </div>
          <h3>{t.val_1_title}</h3>
          <p>{t.val_1_desc}</p>
        </div>

        <div className="value-card">
          <div className="value-icon">
            <i className="ri-flashlight-line"></i>
          </div>
          <h3>{t.val_2_title}</h3>
          <p>{t.val_2_desc}</p>
        </div>

        <div className="value-card">
          <div className="value-icon">
            <i className="ri-shield-check-line"></i>
          </div>
          <h3>{t.val_3_title}</h3>
          <p>{t.val_3_desc}</p>
        </div>
      </div>
    </div>
  </section>
);

const Team = ({ lang, translations }) => (
  <section className="about-section">
    <div className="container center-header">
      <h2>{translations[lang].team_title}</h2>

      <div className="team-grid">
        {translations.team.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.img} alt={member.name_en} />
            <h4>{member[`name_${lang}`]}</h4>
            <p>{member[`role_${lang}`]}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);