import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { listingDetailsTranslations } from '../data/Listingdet_trans';
import '../pages/ListingDetails.css';

function ListingDetailsPage() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const t = listingDetailsTranslations[lang];
  const isRtl = lang === 'ar';

  const propertyId = id ? parseInt(id) : null;

  // Arabic numeral formatter
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US'),
    [lang]
  );

  // Translate DB values (zone, type) using the language dictionary
  const translateValue = useCallback(
    (val) => (val && t.dictionary && t.dictionary[val]) ? t.dictionary[val] : (val ?? ''),
    [t]
  );

  const formatPrice = useCallback(
    (price) => `${t.egp} ${numberFormatter.format(Number(price))}`,
    [t, numberFormatter]
  );

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationData, setReservationData] = useState({
    fullName: '', email: '', phone: '', message: ''
  });

  useEffect(() => {
    if (!propertyId) return;
    setLoading(true);
    setNotFound(false);
    setProperty(null);
    window.scrollTo(0, 0);

    fetch(`/api/listing_details.php?id=${propertyId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.unit) setProperty(data.unit);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [propertyId]);

  const images = (() => {
    if (!property) return ['https://via.placeholder.com/800x500?text=No+Image'];
    const list = [];
    if (property.cover_image) list.push(property.cover_image);
    if (property.images?.length > 0) list.push(...property.images);
    return list.length > 0 ? list : ['https://via.placeholder.com/800x500?text=No+Image'];
  })();

  useEffect(() => {
    const handleScroll = () => setShowStickyHeader(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showShareMenu && !e.target.closest('.pd-share-container')) setShowShareMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShareMenu]);

  useEffect(() => {
    if (!showAllPhotos) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') setCurrentPhotoIndex(i => Math.min(i + 1, images.length - 1));
      if (e.key === 'ArrowLeft')  setCurrentPhotoIndex(i => Math.max(i - 1, 0));
      if (e.key === 'Escape')     setShowAllPhotos(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showAllPhotos, images.length]);

  const handleReserveClick = useCallback((e) => {
    if (e) e.preventDefault();
    setShowReservationModal(true);
  }, []);

  const handleReservationSubmit = useCallback((e) => {
    e.preventDefault();
    alert(t.alertRequestSent);
    setShowReservationModal(false);
    setReservationData({ fullName: '', email: '', phone: '', message: '' });
  }, [t]);

  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    alert(t.alertMessageSent);
    setShowContact(false);
  }, [t]);

  const shareUrl = window.location.href;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(t.alertLinkCopied);
      setShowShareMenu(false);
    });
  }, [shareUrl, t]);

  if (loading) {
    return (
      <div className="pd-page" dir={isRtl ? 'rtl' : 'ltr'}>
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>{t.loading}</p>
        </div>
      </div>
    );
  }

  if (notFound || !property) {
    return (
      <div className="pd-page" dir={isRtl ? 'rtl' : 'ltr'}>
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h2>{t.notFound}</h2>
          <Link to="/listings" style={{ color: 'var(--blue-main)', marginTop: '1rem', display: 'inline-block' }}>
            {t.backToListings}
          </Link>
        </div>
      </div>
    );
  }

  // Translated + formatted values used throughout
  const displayZone  = translateValue(property.zone);
  const displayType  = translateValue(property.type);
  const displaySpace = numberFormatter.format(property.space);

  return (
    <div className="pd-page" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* STICKY HEADER */}
      <div className={`pd-sticky-header ${showStickyHeader ? 'visible' : ''}`}>
        <div className="pd-sticky-content">
          <div className="pd-sticky-left">
            <h3>{property.name}</h3>
            <span className="pd-sticky-rating">📍 {displayZone}</span>
          </div>
          <div className="pd-sticky-right">
            <button className="pd-btn-ghost" onClick={() => setIsSaved(!isSaved)}>
              {isSaved ? t.saved : t.save}
            </button>
          </div>
        </div>
      </div>

      <div className="pd-layout-wrapper">

        {/* LEFT SIDEBAR */}
        <aside className="pd-left-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">{t.propertyInfo}</h3>

            <div className="filter-group">
              <label className="filter-label">{t.type}</label>
              <p style={{ fontWeight: '600' }}>{displayType}</p>
            </div>

            <div className="filter-group">
              <label className="filter-label">{t.zone}</label>
              <p>{displayZone}</p>
            </div>

            <div className="filter-group">
              <label className="filter-label">{t.space}</label>
              <p>{displaySpace} {t.sqm}</p>
            </div>

            <div className="filter-group">
              <label className="filter-label">{t.price}</label>
              <p style={{ fontWeight: '700', color: 'var(--blue-main)' }}>{formatPrice(property.price)}</p>
            </div>

            {property.seller && (
              <div>
                <hr style={{ margin: '1rem 0', borderColor: '#eee' }} />
                <h3 className="filter-title">{t.agent}</h3>
                <div className="filter-group">
                  <label className="filter-label">{t.name}</label>
                  <p>{property.seller.name}</p>
                </div>
                <div className="filter-group">
                  <label className="filter-label">{t.phone}</label>
                  <p>{property.seller.phone}</p>
                </div>
                <div className="filter-group">
                  <label className="filter-label">{t.email}</label>
                  <p style={{ wordBreak: 'break-word' }}>{property.seller.email}</p>
                </div>
              </div>
            )}

            <div className="filter-actions" style={{ marginTop: '1.5rem' }}>
              <Link to="/listings">
                <button className="btn-filter-reset" style={{ width: '100%' }}>
                  {t.backToListings}
                </button>
              </Link>
            </div>
          </div>
        </aside>

        {/* MAIN COLUMN */}
        <div className="pd-main-column">

          {/* HERO GALLERY */}
          <div className="pd-gallery-header">
            <h1 className="pd-gallery-title">{property.name}</h1>
            {images.length > 1 && (
              <button className="pd-show-all-btn" onClick={() => { setCurrentPhotoIndex(0); setShowAllPhotos(true); }}>
                <span className="pd-show-all-icon">⊞</span> {t.showAllPhotos(images.length)}
              </button>
            )}
          </div>

          <div className="pd-hero">
            {images.length === 1 ? (
              <div className="pd-hero-single" onClick={() => { setCurrentPhotoIndex(0); setShowAllPhotos(true); }}>
                <img src={images[0]} alt={property.name} />
                <div className="pd-hero-single-overlay">
                  <span>{t.viewPhoto}</span>
                </div>
              </div>
            ) : (
              <div className="pd-hero-mosaic">
                <div className="pd-hero-main" onClick={() => { setCurrentPhotoIndex(0); setShowAllPhotos(true); }}>
                  <img src={images[0]} alt={property.name} />
                  <div className="pd-hero-img-hover" />
                </div>
                <div className="pd-hero-grid">
                  {images.slice(1, 5).map((img, i) => {
                    const isLast = i === 3 && images.length > 5;
                    return (
                      <div key={i} className="pd-hero-side" onClick={() => { setCurrentPhotoIndex(i + 1); setShowAllPhotos(true); }}>
                        <img src={img} alt={`photo-${i + 1}`} />
                        <div className="pd-hero-img-hover" />
                        {isLast && (
                          <div className="pd-more-overlay">
                            <span className="pd-more-count">+{numberFormatter.format(images.length - 5)}</span>
                            <span className="pd-more-label">{t.morePhotos}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* INNER LAYOUT */}
          <div className="pd-main-layout">
            <div className="pd-content">

              {/* HEADER */}
              <div className="pd-header">
                <div>
                  <div className="pd-meta-row">
                    <span>🏠 {displayType}</span>
                    <span className="dot">·</span>
                    <span>📍 {displayZone}</span>
                    <span className="dot">·</span>
                    <span>📐 {displaySpace} {t.sqm}</span>
                  </div>
                </div>

                <div className="pd-actions-row">
                  <div className="pd-share-container">
                    <button className="pd-btn-share" onClick={() => setShowShareMenu(!showShareMenu)}>
                      {t.share}
                    </button>
                    {showShareMenu && (
                      <div className="pd-share-menu">
                        <div className="pd-share-item" onClick={handleCopyLink}>
                          <span>📋</span> {t.copyLink}
                        </div>
                        <a
                          href={`https://wa.me/?text=Check out this property: ${shareUrl}`}
                          target="_blank" rel="noopener noreferrer"
                          className="pd-share-item"
                        >
                          <span>💬</span> {t.whatsapp}
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                          target="_blank" rel="noopener noreferrer"
                          className="pd-share-item"
                        >
                          <span>📘</span> {t.facebook}
                        </a>
                      </div>
                    )}
                  </div>
                  <button className="pd-btn-save" onClick={() => setIsSaved(!isSaved)}>
                    {isSaved ? t.saved : t.save}
                  </button>
                </div>
              </div>
              <hr className="pd-divider" />

              {/* HIGHLIGHTS */}
              <div className="pd-highlights-grid">
                <div className="pd-highlight-box">
                  <span className="pd-icon-xl">🏠</span>
                  <div>
                    <strong>{t.highlightType}</strong>
                    <span>{displayType}</span>
                  </div>
                </div>
                <div className="pd-highlight-box">
                  <span className="pd-icon-xl">📍</span>
                  <div>
                    <strong>{t.highlightZone}</strong>
                    <span>{displayZone}</span>
                  </div>
                </div>
                <div className="pd-highlight-box">
                  <span className="pd-icon-xl">📐</span>
                  <div>
                    <strong>{t.highlightSpace}</strong>
                    <span>{displaySpace} {t.sqm}</span>
                  </div>
                </div>
                <div className="pd-highlight-box">
                  <span className="pd-icon-xl">💰</span>
                  <div>
                    <strong>{t.highlightPrice}</strong>
                    <span>{formatPrice(property.price)}</span>
                  </div>
                </div>
              </div>
              <hr className="pd-divider" />

              {/* DESCRIPTION */}
              <div className="pd-section">
                <h2>{t.aboutProperty}</h2>
                <p className="pd-desc">{property.description || t.noDescription}</p>
              </div>
              <hr className="pd-divider" />

              {/* PROPERTY DETAILS */}
              <div className="pd-section">
                <h2>{t.propertyDetails}</h2>
                <div className="pd-details-grid">
                  <div className="pd-detail-box">
                    <span className="pd-detail-label">{t.propertyName}</span>
                    <strong className="pd-detail-value">{property.name}</strong>
                  </div>
                  <div className="pd-detail-box">
                    <span className="pd-detail-label">{t.type}</span>
                    <strong className="pd-detail-value">{displayType}</strong>
                  </div>
                  <div className="pd-detail-box">
                    <span className="pd-detail-label">{t.zone}</span>
                    <strong className="pd-detail-value">{displayZone}</strong>
                  </div>
                  <div className="pd-detail-box">
                    <span className="pd-detail-label">{t.space}</span>
                    <strong className="pd-detail-value">{displaySpace} {t.sqm}</strong>
                  </div>
                  <div className="pd-detail-box">
                    <span className="pd-detail-label">{t.price}</span>
                    <strong className="pd-detail-value" style={{ color: 'var(--blue-main)' }}>
                      {formatPrice(property.price)}
                    </strong>
                  </div>
                </div>
              </div>
              <hr className="pd-divider" />

              {/* LOCATION */}
              <div className="pd-section">
                <h2>{t.location}</h2>
                <div
                  className="pd-map-container"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.zone + ', Egypt')}`,
                      '_blank'
                    )
                  }
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src="https://i.pinimg.com/1200x/53/39/5d/53395d990c4aee6e4ce3517dc6bda5d1.jpg"
                    alt="Map"
                    className="pd-map-image"
                  />
                  <div className="pd-map-label">
                    <strong>{property.name}</strong>
                    <span className="pd-map-address">{displayZone}، {t.egypt}</span>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.zone + ', Egypt')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="pd-map-link"
                >
                  {t.openMaps}
                </a>
              </div>
              <hr className="pd-divider" />

              {/* SELLER INFO */}
              {property.seller && (
                <div>
                  <div className="pd-host-section">
                    <div className="pd-host-info">
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: 'var(--blue-main)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', color: '#fff', fontWeight: '700', flexShrink: 0
                      }}>
                        {property.seller.name.charAt(0)}
                      </div>
                      <div>
                        <h3>{t.listedBy} {property.seller.name}</h3>
                        <p>📞 {property.seller.phone}</p>
                        <p>✉️ {property.seller.email}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="pd-divider" />
                </div>
              )}

            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="pd-sidebar">
              <div className="pd-booking-card">

                <div className="pd-price-row">
                  <h2 style={{ color: 'var(--blue-main)' }}>{formatPrice(property.price)}</h2>
                  <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    {displayType} · {displaySpace} {t.sqm}
                  </p>
                </div>

                <div style={{ margin: '1.5rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#666' }}>{t.type}</span>
                    <span style={{ fontWeight: '600' }}>{displayType}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <span style={{ color: '#666' }}>{t.zone}</span>
                    <span style={{ fontWeight: '600' }}>{displayZone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                    <span style={{ color: '#666' }}>{t.space}</span>
                    <span style={{ fontWeight: '600' }}>{displaySpace} {t.sqm}</span>
                  </div>
                </div>

                {/* Single Contact Agent button */}
                <button onClick={handleReserveClick} className="pd-reserve-btn">
                  {t.contactAgent}
                </button>

                {property.seller && (
                  <div>
                    <div
                      className="pd-agent-mini"
                      onClick={() => setShowContact(true)}
                      style={{ cursor: 'pointer', marginTop: '1rem' }}
                    >
                      <div className="pd-agent-left">
                        <div style={{
                          width: '45px', height: '45px', borderRadius: '50%',
                          background: 'var(--blue-main)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: '700', fontSize: '1.1rem', flexShrink: 0
                        }}>
                          {property.seller.name.charAt(0)}
                        </div>
                        <div className="pd-agent-text">
                          <h4>{property.seller.name}</h4>
                          <p>{property.seller.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pd-contact-section" style={{ marginTop: '1rem' }}>
                      <button className="pd-contact-host-btn" onClick={() => setShowContact(true)}>
                        {t.sendMessage}
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                      <a href={`tel:${property.seller.phone}`} className="pd-btn-call" style={{ flex: 1, textAlign: 'center' }}>
                        {t.call}
                      </a>
                      <a
                        href={`https://wa.me/20${property.seller.phone}`}
                        target="_blank" rel="noopener noreferrer"
                        className="pd-btn-whatsapp"
                        style={{ flex: 1, textAlign: 'center' }}
                      >
                        {t.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* MOBILE FOOTER */}
      <div className="pd-mobile-footer">
        <div className="pd-mobile-left">
          <strong className="pd-mobile-price">{formatPrice(property.price)}</strong>
          <span className="pd-mobile-sub">{displayType}</span>
        </div>
        <button className="pd-mobile-btn" onClick={handleReserveClick}>
          {t.contact}
        </button>
      </div>

      {/* RESERVATION MODAL */}
      {showReservationModal && (
        <div className="pd-modal-overlay" onClick={() => setShowReservationModal(false)}>
          <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>{t.requestInfo}</h3>
              <button className="pd-modal-close" onClick={() => setShowReservationModal(false)}>×</button>
            </div>
            <div className="pd-modal-body">
              <form onSubmit={handleReservationSubmit}>
                <div className="pd-form-group">
                  <label className="pd-form-label">{t.fullName}</label>
                  <input type="text" required className="pd-form-input"
                    value={reservationData.fullName}
                    onChange={(e) => setReservationData({ ...reservationData, fullName: e.target.value })}
                  />
                </div>
                <div className="pd-form-group">
                  <label className="pd-form-label">{t.emailLabel}</label>
                  <input type="email" required className="pd-form-input"
                    value={reservationData.email}
                    onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                  />
                </div>
                <div className="pd-form-group">
                  <label className="pd-form-label">{t.phoneLabel}</label>
                  <input type="tel" required className="pd-form-input"
                    value={reservationData.phone}
                    onChange={(e) => setReservationData({ ...reservationData, phone: e.target.value })}
                  />
                </div>
                <div className="pd-form-group">
                  <label className="pd-form-label">{t.messageLabel}</label>
                  <textarea rows="3" className="pd-form-textarea"
                    placeholder={t.interestedPlaceholder}
                    value={reservationData.message}
                    onChange={(e) => setReservationData({ ...reservationData, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="pd-reserve-btn">{t.sendRequest}</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="pd-modal-overlay" onClick={() => setShowContact(false)}>
          <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>{t.contactModalTitle} {property.seller ? property.seller.name : ''}</h3>
              <button className="pd-modal-close" onClick={() => setShowContact(false)}>×</button>
            </div>
            <div className="pd-modal-body">
              <form onSubmit={handleContactSubmit}>
                <div className="pd-form-group">
                  <label className="pd-form-label">{t.messageLabel}</label>
                  <textarea rows="4" className="pd-form-textarea" placeholder={t.hiPlaceholder} required />
                </div>
                <button type="submit" className="pd-btn-whatsapp">{t.sendMessage}</button>
              </form>
              {property.seller && (
                <div>
                  <div style={{ margin: '20px 0', borderBottom: '1px solid #eee' }} />
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href={`tel:${property.seller.phone}`} className="pd-btn-call">{t.call}</a>
                    <a
                      href={`https://wa.me/20${property.seller.phone}`}
                      target="_blank" rel="noopener noreferrer"
                      className="pd-btn-whatsapp"
                    >
                      {t.whatsapp}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {showAllPhotos && (
        <div className="pd-lightbox-overlay" onClick={() => setShowAllPhotos(false)}>
          <div className="pd-lightbox" onClick={(e) => e.stopPropagation()}>
            <div className="pd-lightbox-header">
              <span className="pd-lightbox-counter">
                {numberFormatter.format(currentPhotoIndex + 1)} / {numberFormatter.format(images.length)}
              </span>
              <button className="pd-lightbox-close" onClick={() => setShowAllPhotos(false)}>✕</button>
            </div>

            <div className="pd-lightbox-stage">
              <button
                className="pd-lightbox-nav pd-lightbox-prev"
                onClick={() => setCurrentPhotoIndex(i => Math.max(0, i - 1))}
                disabled={currentPhotoIndex === 0}
              >‹</button>

              <div className="pd-lightbox-img-wrap">
                <img
                  key={currentPhotoIndex}
                  src={images[currentPhotoIndex]}
                  alt={`photo ${numberFormatter.format(currentPhotoIndex + 1)}`}
                  className="pd-lightbox-img"
                />
              </div>

              <button
                className="pd-lightbox-nav pd-lightbox-next"
                onClick={() => setCurrentPhotoIndex(i => Math.min(images.length - 1, i + 1))}
                disabled={currentPhotoIndex === images.length - 1}
              >›</button>
            </div>

            <div className="pd-lightbox-strip">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`pd-lightbox-thumb ${i === currentPhotoIndex ? 'active' : ''}`}
                  onClick={() => setCurrentPhotoIndex(i)}
                >
                  <img src={img} alt={`thumb-${numberFormatter.format(i + 1)}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ListingDetailsPage;
