import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SellerTranslations } from '../data/Sellers';
import './SellerPage.css';

const API = 'http://localhost/easysakan';

export default function SellerPage() {
  const navigate = useNavigate();
  const fileRef      = useRef(null);
  const extraRef     = useRef(null);
  const { user } = useAuth();
  const { lang } = useLanguage();
  
  const t = SellerTranslations[lang];

  const [form, setForm] = useState({
    title: '',
    location: '',
    listingType: '',
    price: '',
    space: '',
    description: '',
    phone: '',
  });
  const [photo, setPhoto]             = useState(null);
  const [preview, setPreview]         = useState(null);
  const [extraPhotos, setExtraPhotos] = useState([]);
  const [extraPreviews, setExtraPreviews] = useState([]);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState('');
  const [submitting, setSubmitting]   = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleExtraFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setExtraPhotos((prev) => [...prev, ...files]);
    setExtraPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    e.target.value = '';
  };

  const removeExtraPhoto = (index) => {
    setExtraPhotos((prev) => prev.filter((_, i) => i !== index));
    setExtraPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!photo) {
      setError(t.errors.photoRequired);
      return;
    }

    if (!user) {
      setError(t.errors.loginRequired);
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('photo', photo);
    fd.append('custID', user.id);
    extraPhotos.forEach((f) => fd.append('extra_photos[]', f));

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/seller_handler.php`, {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      const raw = await res.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        setError(`${t.errors.serverError} (HTTP ${res.status}): ${raw.slice(0, 300) || '(empty response)'}`);
        return;
      }
      if (data.success) {
        setSuccess(data.message || 'Listing published successfully!');
        setTimeout(() => navigate('/seller/dashboard'), 1800);
      } else {
        setError(data.message || t.errors.generic);
      }
    } catch {
      setError(t.errors.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="seller-page">
 

      <main className="seller-main">
        {/* Hero */}
        <div className="seller-hero-section">
          {/* ADDED: style={{ textAlign: 'center' }} */}
          <div className="seller-hero-content" style={{ textAlign: 'center' }}>
            <h1 className="seller-hero-title">{t.hero.title}</h1>
            <p className="seller-hero-subtitle">
              {t.hero.subtitle}
            </p>
            <div className="seller-hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/listings')}>
                {t.hero.browseListings}
              </button>
              <button className="btn-secondary" onClick={() => navigate('/seller/dashboard')}>
                {t.hero.myListings}
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="seller-form-section show">
          <div className="seller-form-container">
            {/* ADDED: style={{ textAlign: 'center' }} */}
            <div className="seller-form-header" style={{ textAlign: 'center' }}>
              <h2>{t.form.newListing}</h2>
              <p>{t.form.requiredNote}</p>
            </div>

            <div className="seller-form-card">
              {error && (
                <div style={{ background: '#fee2e2', borderLeft: '4px solid #dc2626', color: '#991b1b', padding: '12px 16px', borderRadius: 8, marginBottom: 16, fontWeight: 600, fontSize: '0.85rem' }}>
                  {error}
                </div>
              )}
              {success && (
                <div className="seller-success-banner">
                  {success} — {t.errors.successRedirect}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="seller-grid">
                  {/* Title */}
                  <div className="seller-field seller-full-width">
                    <label htmlFor="title">{t.form.labels.title}</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder={t.form.placeholders.title}
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="seller-field">
                    <label htmlFor="location">{t.form.labels.location}</label>
                    <select
                      id="location"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t.form.selectPlaceholder}</option>
                      {t.locations.map((loc) => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Listing Type */}
                  <div className="seller-field">
                    <label htmlFor="listingType">{t.form.labels.type}</label>
                    <select
                      id="listingType"
                      name="listingType"
                      value={form.listingType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t.form.selectPlaceholder}</option>
                      {t.listingTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="seller-field">
                    <label htmlFor="price">{t.form.labels.price}</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      placeholder={t.form.placeholders.price}
                      min="1"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Space */}
                  <div className="seller-field">
                    <label htmlFor="space">{t.form.labels.space}</label>
                    <input
                      id="space"
                      name="space"
                      type="number"
                      placeholder={t.form.placeholders.space}
                      min="1"
                      value={form.space}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="seller-field">
                    <label htmlFor="phone">{t.form.labels.phone}</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t.form.placeholders.phone}
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                    <span className="seller-help">{t.form.helpers.phone}</span>
                  </div>

                  {/* Description */}
                  <div className="seller-field seller-full-width">
                    <label htmlFor="description">{t.form.labels.description}</label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder={t.form.placeholders.description}
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="seller-field seller-full-width">
                    <label>{t.form.labels.coverPhoto}</label>
                    <div
                      className="file-upload-area"
                      onClick={() => fileRef.current?.click()}
                      style={preview ? { padding: 0, border: '2px solid #1876d3' } : {}}
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 6, display: 'block' }}
                        />
                      ) : (
                        <p className="upload-prompt">
                          {t.form.uploadPrompt}
                        </p>
                      )}
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFile}
                        style={{ display: 'none' }}
                      />
                    </div>
                    {preview && (
                      <button
                        type="button"
                        onClick={() => { setPhoto(null); setPreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                        style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.8rem', cursor: 'pointer', marginTop: 4, fontWeight: 600 }}
                      >
                        {t.form.removePhoto}
                      </button>
                    )}
                  </div>

                  {/* Additional Photos */}
                  <div className="seller-field seller-full-width">
                    <label>Additional Photos <span style={{ fontWeight: 400, color: '#6b7280' }}>(optional, up to 10)</span></label>
                    <div
                      className="file-upload-area"
                      onClick={() => extraRef.current?.click()}
                      style={{ padding: '1.2rem', minHeight: 80 }}
                    >
                      <p className="upload-prompt" style={{ fontSize: '0.9rem' }}>
                        Click to add more photos
                      </p>
                      <input
                        ref={extraRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={handleExtraFiles}
                        style={{ display: 'none' }}
                      />
                    </div>
                    {extraPreviews.length > 0 && (
                      <div className="extra-photos-grid">
                        {extraPreviews.map((src, i) => (
                          <div key={i} className="extra-photo-thumb">
                            <img src={src} alt={`extra-${i}`} />
                            <button type="button" className="extra-photo-remove" onClick={() => removeExtraPhoto(i)}>×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="seller-buttons">
                  <button
                    type="button"
                    className="seller-cancel-btn"
                    onClick={() => navigate('/seller/dashboard')}
                  >
                    {t.form.buttons.cancel}
                  </button>
                  <button
                    type="submit"
                    className="seller-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? t.form.buttons.publishing : t.form.buttons.publish}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}