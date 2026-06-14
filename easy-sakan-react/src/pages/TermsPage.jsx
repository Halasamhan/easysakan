import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { termsTranslations } from '../data/Terms'; // Import the translation data


import './TermsPage.css';

export default function Terms() {
  const { lang } = useLanguage();
  const t = termsTranslations[lang]; // Access current language data

  // Set direction for RTL support
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    // Add dir attribute and a class for potential CSS targeting
    <div className={`terms-wrapper ${lang === 'ar' ? 'rtl' : ''}`} dir={dir}>
     

      <div className="container-wide terms-container">
        <div className="terms-content">
          <h1>{t.title}</h1>
          <p className="terms-date">{t.date}</p>

          {/* Map through sections dynamically */}
          {t.sections.map((section) => (
            <section key={section.id}>
              <h2>{section.title}</h2>

              {/* Render content if it exists. Using dangerouslySetInnerHTML because data contains HTML tags like <strong> */}
              {section.content && (
                <p dangerouslySetInnerHTML={{ __html: section.content }} />
              )}

              {/* Render list if it exists */}
              {section.list && (
                <ul>
                  {section.list.map((item, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}

              {/* Specific handling for the Contact Section (Section 8) based on the flag */}
              {section.contactInfo && (
                <p>
                  <strong>{t.contactLabel}:</strong> {t.contactValue}<br />
                  <strong>{t.phoneLabel}:</strong> {t.phoneValue}
                </p>
              )}
            </section>
          ))}

        </div>
      </div>
    
    </div>
  );
}