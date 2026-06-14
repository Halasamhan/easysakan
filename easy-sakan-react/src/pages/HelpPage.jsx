import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { helpTranslations, toArabicNum } from '../data/Help';
import { useLanguage } from '../context/LanguageContext';
import './/HelpPage.css';

export default function HelpCenterExpanded() {
  const { lang, toggleLanguage } = useLanguage();
  const t = helpTranslations[lang]; 

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); 
  const [expandedId, setExpandedId] = useState(null);

  // Categories configuration
  const categories = [
    { key: 'All' },
    { key: 'Apartments' },
    { key: 'Services' },
    { key: 'Transport' },
    { key: 'Account' },
  ];

  // Filter Logic
  const filteredArticles = useMemo(() => {
    return t.articles.filter(item => {
      const title = item.title[lang].toLowerCase();
      const summary = item.summary[lang].toLowerCase();
      
      const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
                            summary.includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory, t, lang]);

  return (
    <div className={`helpcenter-wrapper ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
       
      {/* Language Switcher */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100 }}>
        <button onClick={toggleLanguage} className="hc-lang-toggle">
          {lang === 'en' ? '🇸🇦 العربية' : '🇺🇸 English'}
        </button>
      </div>

      {/* Hero & Search */}
      <section className="hc-hero">
        <div className="container-wide">
          <h1>{t.hero_title}</h1>
          <div className="hc-search-container">
            <span className="hc-icon">🔍</span>
            <input 
              type="text" 
              placeholder={t.search_placeholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="hc-search-btn">{t.search_btn}</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-wide hc-main-content">
        
        {/* Left Column: Results */}
        <div className="hc-results">
          <div className="hc-results-header">
            <h2>{t.results_title}</h2>
            <span className="hc-count">
              {t.results_count(
                lang === 'ar' ? toArabicNum(filteredArticles.length) : filteredArticles.length
              )}
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="hc-list">
              {filteredArticles.map((item, index) => (
                <div 
                  key={item.id} 
                  className="hc-card"
                  // ADDED: Staggered Animation Delay
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="hc-card-header" 
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <span className={`hc-tag ${item.category.toLowerCase()}`}>
                      {item.categoryName[lang]}
                    </span>
                    <h3>{item.title[lang]}</h3>
                  </div>
                  
                  <p className="hc-summary">{item.summary[lang]}</p>

                  {/* ADDED: 'open' class for smooth height transition */}
                  <div className={`hc-answer ${expandedId === item.id ? 'open' : ''}`}>
                    <p><strong>{lang === 'en' ? 'Answer:' : 'إجابة:'}</strong> {item.answer[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="hc-empty">
              <p>{t.no_results}</p>
              <button onClick={() => {setSearchTerm(''); setActiveCategory('All')}}>
                {t.clear_filters}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <aside className="hc-sidebar">
          <div className="hc-sidebar-box">
            <h3>{t.quick_categories}</h3>
            
            <ul>
              {categories.map((cat) => (
                <li key={cat.key}>
                  <button 
                    className={activeCategory === cat.key ? 'cat-active' : ''} 
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.key === 'All' && '📚 '}
                    {cat.key === 'Apartments' && '🏢 '}
                    {cat.key === 'Services' && '🛠️ '}
                    {cat.key === 'Transport' && '🚛 '}
                    {cat.key === 'Account' && '💳 '}
                    
                    {/* Dynamic Label */}
                    {t[`cat_${cat.key.toLowerCase()}`]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hc-contact-card">
            <h4>{t.contact_title}</h4>
            <p>{t.contact_desc}</p>
            <Link to="/contact" className="hc-btn-contact">{t.contact_btn}</Link>
          </div>
        </aside>

      </div>

    </div>
  );
}