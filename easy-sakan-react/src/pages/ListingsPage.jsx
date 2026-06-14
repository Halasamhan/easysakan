import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { showcaseTranslations } from '../data/ListingsPage';

import './ListingPage.css';

// Helper function to check price range based on raw number
function inSelectedPriceRange(priceValue, selectedRange) {
  if (!selectedRange || selectedRange === 'any') return true;
  if (priceValue === null || isNaN(priceValue)) return false;
  if (selectedRange === 'under-500k') return priceValue < 500000;
  if (selectedRange === '500k-2m') return priceValue >= 500000 && priceValue <= 2000000;
  if (selectedRange === '2m-5m') return priceValue > 2000000 && priceValue <= 5000000;
  if (selectedRange === 'over-5m') return priceValue > 5000000;
  return true;
}

export default function ListingsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang } = useLanguage();
  const t = showcaseTranslations[lang];

  // Formatter for numbers (English vs Arabic numerals)
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US'),
    [lang]
  );

  const [search, setSearch] = useState('');

  // Sync search input from URL param (e.g. when navigating from the header search bar)
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Single filter state for direct application
  const [filters, setFilters] = useState({
    priceRange: 'any',
    type: 'all',
    location: ''
  });

  const [dbListings, setDbListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get the dictionary to translate DB values like 'New Cairo' -> 'القاهرة الجديدة'
    const dict = t.dictionary || {};

    fetch('/api/listing_handler.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const normalized = data.units.map(unit => ({
            id: `db-${unit.unitID}`,
            title: unit.name,
            // Translate location using dictionary, fallback to raw value
            location: `📍 ${dict[unit.zone] || unit.zone}`,
            category: unit.type,
            type: unit.type,
            // Translate type and zone using dictionary in specs
            specs: [
              `${numberFormatter.format(unit.space)} ${lang === 'ar' ? 'م²' : 'm²'}`,
              dict[unit.zone] || unit.zone, 
              dict[unit.type] || unit.type
            ],
            rawPrice: Number(unit.price),
            price: `${lang === 'ar' ? 'جنيه' : 'EGP'} ${numberFormatter.format(unit.price)}`,
            cover_image: unit.cover_image
              ? `http://localhost/easysakan/${unit.cover_image.replace(/\\/g, '/').replace(/ /g, '%20')}`
              : null,
            isDbListing: true
          }));
          setDbListings(normalized);
        }
      })
      .catch(err => console.error('Error fetching listings:', err))
      .finally(() => setLoading(false));
  }, [lang, numberFormatter, t]);

  const filteredListings = useMemo(() => {
    const q = search.trim().toLowerCase();
    return dbListings.filter((item) => {
      const byCategory   = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const byPriceRange = inSelectedPriceRange(item.rawPrice, filters.priceRange);
      const byType       = filters.type === 'all' || item.type.toLowerCase() === filters.type.toLowerCase();

      const itemLocation    = item.location.toLowerCase();
      const selectedLocation = String(filters.location || '').trim().toLowerCase();
      const byLocation  = !selectedLocation || itemLocation.includes(selectedLocation);

      const bySearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.specs.some(s => String(s).toLowerCase().includes(q));

      return byCategory && byPriceRange && byType && byLocation && bySearch;
    });
  }, [dbListings, selectedCategory, filters, search]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`home-body ${lang === 'ar' ? 'rtl' : ''}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <main className="showcase-main">
        {/* Hero Section */}
        <section className="showcase-hero">
          <div className="showcase-overlay"></div>
          <div className="showcase-hero-content">
            <p className="showcase-kicker">{t.hero.kicker}</p>
            <h1 className="showcase-title">{t.hero.title}</h1>
            <p className="showcase-hero-subtitle">{t.hero.subtitle}</p>
            <a href="#listings-section" className="showcase-hero-btn">{t.hero.browseBtn}</a>
          </div>
        </section>

        {/* Filter Panel */}
        <section className="showcase-filter-panel-section">
          <div className="container-wide">
            {/* Search bar */}
            <div className="showcase-filter-group" style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                id="listingsSearch"
                className="showcase-filter-input"
                style={{ width: '100%' }}
                placeholder={t.filters.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="showcase-filter-panel">
              {/* Category Filter */}
              <div className="showcase-filter-group">
                <label htmlFor="categoryFilter">{t.filters.categoryLabel}</label>
                <select
                  id="categoryFilter"
                  className="showcase-filter-input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">{t.filters.options.all}</option>
                  <option value="rent">{t.filters.options.rent}</option>
                  <option value="sale">{t.filters.options.sale}</option>
                  <option value="apartment">{t.filters.options.apartment}</option>
                  <option value="villa">{t.filters.options.villa}</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="showcase-filter-group">
                <label htmlFor="priceRangeFilter">{t.filters.priceRangeLabel}</label>
                <select
                  id="priceRangeFilter"
                  className="showcase-filter-input"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  {t.filters.priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="showcase-filter-group">
                <label htmlFor="typeFilter">{t.filters.typeLabel}</label>
                <select
                  id="typeFilter"
                  className="showcase-filter-input"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  {t.filters.types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="showcase-filter-group">
                <label htmlFor="locationFilter">{t.filters.locationLabel}</label>
                <select
                  id="locationFilter"
                  className="showcase-filter-input"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="">{t.filters.locationPlaceholder || 'All Locations'}</option>
                  {t.locationsList.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section id="listings-section" className="showcase-section showcase-curated">
          <div className="container-wide">
            <div className="showcase-title-center">
              <p>{t.sections.listings.kicker}</p>
              <h2>{t.sections.listings.title}</h2>
              <span>{filteredListings.length} {t.sections.listings.matchedLabel}</span>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', padding: '2rem' }}>{t.sections.listings.loading}</p>
            ) : filteredListings.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem' }}>{t.sections.listings.noResults}</p>
            ) : (
              <div className="showcase-property-grid">
                {filteredListings.map((item) => (
                  <article className="showcase-property-card" key={item.id}>
                    <div
                      className="showcase-property-image"
                      style={item.cover_image ? {
                        backgroundImage: `url("${item.cover_image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      } : undefined}
                    />
                    <div className="showcase-property-body">
                      <h3>{item.title}</h3>
                      <p>{item.location}</p>
                      <div className="showcase-specs-row">
                        {item.specs.slice(0, 3).map((spec, i) => (
                          <span key={i}>{spec}</span>
                        ))}
                      </div>
                      <div className="showcase-property-footer">
                        <strong>{item.price}</strong>
                        <button
                          type="button"
                          onClick={() => navigate(`/listing/${item.id.replace('db-', '')}`)}
                        >
                          {t.sections.listings.viewDetails}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}