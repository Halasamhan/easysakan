import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { homeTranslations, toArabicNum } from '../data/Homepage';
import '../styles/Homepage.css';

// ─── Stat Counter Hook ───
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, startOnView]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function: easeOutExpo for rapid start, smooth landing
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOutExpo * end);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

// ─── Animated Stat Number Component ───
function AnimatedStatNumber({ rawNum, lang, formatNumber }) {
  // Parse the number for counting
  const parseNumber = (val) => {
    if (typeof val === 'string') {
      // Extract digits from strings like "24/7" or "1,000+"
      const match = val.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(/,/g, '')) : 0;
    }
    return val;
  };

  const numericValue = parseNumber(rawNum);
  const { count, ref } = useCountUp(numericValue, 2500);

  // Format the counted number
  const displayCount = () => {
    if (typeof rawNum === 'string') {
      // For strings like "24/7", replace the number part with counted value
      const countedFormatted = new Intl.NumberFormat('en-US').format(count);
      if (lang === 'ar') {
        return toArabicNum(rawNum.replace(/[\d,]+/, countedFormatted));
      }
      return rawNum.replace(/[\d,]+/, countedFormatted);
    }

    const formatted = new Intl.NumberFormat('en-US').format(count);
    if (lang === 'ar') {
      return toArabicNum(formatted);
    }
    return formatted;
  };

  return (
    <h3 className="stat-number" ref={ref}>
      {displayCount()}
    </h3>
  );
}

// ─── Scroll Reveal Hook ───
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function HomePage() {
  const { lang } = useLanguage();
  const t = homeTranslations[lang];

  // Helper function handles both Numbers (e.g. 1000) and Strings (e.g. "24/7")
  const formatNumber = (num) => {
    if (typeof num === 'string') {
      if (lang === 'ar') {
        return toArabicNum(num);
      }
      return num;
    }

    const formatted = new Intl.NumberFormat('en-US').format(num);

    if (lang === 'ar') {
      return toArabicNum(formatted);
    }
    return formatted;
  };

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  return (
    <div className="home-body" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container-wide">
            <div className="hero-content">
              <h1 className="hero-title">{t.hero.title}</h1>
              <p className="hero-subtitle">{t.hero.subtitle}</p>
              <div className="hero-actions">
                <Link to="/listings" className="btn-hero-primary">{t.hero.btn_primary}</Link>
                <a href="#services" className="btn-hero-secondary">{t.hero.btn_secondary}</a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container-wide">
            <div className="stats-grid">
              {t.stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <AnimatedStatNumber 
                    rawNum={stat.rawNum} 
                    lang={lang} 
                    formatNumber={formatNumber} 
                  />
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="container-wide">
            <h2 className="section-title">{t.how_it_works.title}</h2>
            <p className="section-subtitle">{t.how_it_works.subtitle}</p>
            <div className="steps-container">
              {t.how_it_works.steps.map((step) => (
                <div className="step-item" key={step.id}>
                  <div className="step-circle">{formatNumber(step.id)}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section" id="services">
          <div className="container-wide">
            <h2 className="section-title">{t.services.title}</h2>
            <p className="section-subtitle">{t.services.subtitle}</p>
            <div className="services-grid">
              {t.services.list.map((service, index) => (
                <Link to={service.link} className="service-card" key={index}>
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.desc}</p>
                  <span className="service-link">{service.link_text}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container-wide">
            <h2 className="section-title">{t.testimonials.title}</h2>
            <p className="section-subtitle">{t.testimonials.subtitle}</p>
            <div className="testimonials-grid">
              {t.testimonials.list.map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-rating">{item.rating}</div>
                  <p className="testimonial-text">{item.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{item.initials}</div>
                    <div className="author-info">
                      <h4 className="author-name">{item.author}</h4>
                      <p className="author-title">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container-wide">
            <div className="cta-content">
              <h2 className="cta-title">{t.cta.title}</h2>
              <p className="cta-subtitle">{t.cta.subtitle}</p>
              <div className="cta-actions">
                <Link to="/signup" className="btn-cta-primary">
                  <img 
                    src="/assets/images/add-user.png" 
                    alt="Sign Up" 
                    style={{ 
                      width: 18, 
                      height: 18, 
                      verticalAlign: 'middle', 
                      marginLeft: lang === 'ar' ? 8 : 0,
                      marginRight: lang === 'en' ? 8 : 0 
                    }} 
                  />
                  {t.cta.btn_primary}
                </Link>
                <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-cta-secondary">
                  📞 {t.cta.btn_secondary}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}