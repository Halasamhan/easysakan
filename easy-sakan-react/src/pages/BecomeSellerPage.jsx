import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/BecomeSellerPage.css'; 

const t = {
  en: {
    title: 'Become a Seller',
    subtitle: 'Submit your national ID to start listing properties on EasySakan.',
    nationalId: 'National ID Number',
    nationalIdPh: '14-digit national ID',
    phone: 'Phone Number',
    phonePh: '01XXXXXXXXX',
    uploadLabel: 'National ID Image',
    uploadHint: 'Upload a clear photo of your national ID (JPG, PNG, WEBP, PDF)',
    uploadBtn: 'Click to upload',
    submitBtn: 'Submit Application',
    submitting: 'Submitting...',
    alreadySeller: "You're already a verified seller.",
    goSell: 'Go to Sell Page',
  },
  ar: {
    title: 'كن بائعاً',
    subtitle: 'أرسل بطاقة هويتك لبدء إدراج العقارات على إيزي سكن.',
    nationalId: 'رقم الهوية الوطنية',
    nationalIdPh: '14 رقماً',
    phone: 'رقم الهاتف',
    phonePh: '01XXXXXXXXX',
    uploadLabel: 'صورة بطاقة الهوية',
    uploadHint: 'ارفع صورة واضحة لبطاقة هويتك (JPG, PNG, WEBP, PDF)',
    uploadBtn: 'اضغط للرفع',
    submitBtn: 'إرسال الطلب',
    submitting: 'جارٍ الإرسال...',
    alreadySeller: 'أنت بالفعل بائع موثق.',
    goSell: 'الذهاب لصفحة البيع',
  },
};

export default function BecomeSellerPage() {
  const navigate = useNavigate();
  const { user, isSeller, markAsSeller } = useAuth();
  const { lang } = useLanguage();
  const tr = t[lang];

  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) { setError(lang === 'ar' ? 'يرجى رفع صورة الهوية' : 'Please upload your national ID image.'); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('cust_id', user.id);
      fd.append('national_id', nationalId);
      fd.append('phone', phone);
      fd.append('natid_image', file);

      const res = await fetch('http://localhost/easysakan/become_seller_handler.php', {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      const data = await res.json();

      if (data.success) {
        markAsSeller();
        setSuccess(true);
      } else {
        setError(data.message);
      }
    } catch {
      setError(lang === 'ar' ? 'خطأ في الاتصال. تأكد من تشغيل XAMPP.' : 'Connection error. Make sure XAMPP is running.');
    } finally {
      setLoading(false);
    }
  };

  if (isSeller || success) {
    return (
      <main className="success-wrapper">
        <div className="success-icon">🎉</div>
        <h2 className="success-title">{tr.alreadySeller}</h2>
        <button className="btn-action" onClick={() => navigate('/seller')}>
          {tr.goSell}
        </button>
      </main>
    );
  }

  return (
    <main className="become-seller-page">
      <div className="seller-container">
        <div className="form-card">
          <div className="header-section">
            <h1>🏠</h1>
            <h1 className="page-title">{tr.title}</h1>
            <p className="page-subtitle">{tr.subtitle}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="seller-form">
            <div className="form-group">
              <label className="form-label">{tr.nationalId}</label>
              <input
                type="text"
                placeholder={tr.nationalIdPh}
                value={nationalId}
                onChange={e => setNationalId(e.target.value)}
                maxLength={14}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">{tr.phone}</label>
              <input
                type="tel"
                placeholder={tr.phonePh}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">{tr.uploadLabel}</label>
              <div className="upload-zone" onClick={() => fileRef.current.click()}>
                {preview ? (
                  <img src={preview} alt="preview" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">🪪</div>
                    <p className="upload-text">{tr.uploadBtn}</p>
                    <p className="upload-hint">{tr.uploadHint}</p>
                  </div>
                )}
                {file && !preview && <p className="file-name">📄 {file.name}</p>}
                <input ref={fileRef} type="file" accept="image/*,.pdf" onChange={handleFile} style={{ display: 'none' }} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? tr.submitting : tr.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}