import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations, getStatusLabel, translatePropertyName, toArabicNum } from '../data/Customerdashboard';
import '../styles/Customerdashboard.css'; // Ensure the CSS file is imported

const API = 'http://localhost/easysakan';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  const cancelOrder = async (orderId) => {
    if (!window.confirm(lang === 'ar' ? 'هل تريد إلغاء هذا الطلب؟' : 'Cancel this order?')) return;
    setCancelLoading(orderId);
    try {
      const res = await fetch(`${API}/customer_bookings.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'cancel', order_id: orderId }),
      });
      const data = await res.json();
      if (data.success) setBookings(prev => prev.filter(b => b.id !== orderId));
    } catch { /* silent */ }
    finally { setCancelLoading(null); }
  };
  const fname = localStorage.getItem('hf_fname') || 'Customer';

  useEffect(() => {
    fetch(`${API}/customer_bookings.php`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) { navigate('/login'); return; }
        setBookings(data.bookings || []);
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <main dir={t.direction} className="cd-page">
        <h1 className="cd-title">{t.welcome}, {fname}</h1>
        <p className="cd-subtitle">{t.manage}</p>

        <section>
          <h2 className="cd-section-title">{t.my_bookings}</h2>
          
          {loading ? (
            <p style={{ color: 'var(--gray)', textAlign: 'center', marginTop: '2rem' }}>{t.loading}</p>
          ) : bookings.length === 0 ? (
            <div className="cd-empty-state">
              <div className="cd-empty-icon">📂</div>
              <p className="cd-empty-text">{t.no_bookings}</p>
              <Link to="/listings" className="cd-browse-btn">{t.browse_listings}</Link>
            </div>
          ) : (
            <div className="cd-card">
              <table className="cd-table">
                <thead>
                  <tr>
                    <th>{t.th_property}</th>
                    <th>{t.th_date}</th>
                    <th>{t.th_status}</th>
                    <th>{lang === 'ar' ? 'إجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.flatMap((b) => {
                    const isTransport = (b.order_type || '').toLowerCase().includes('transport');
                    const services = isTransport
                      ? [b.property_name]
                      : (b.property_name || '').split(',').map(s => s.trim()).filter(Boolean);
                    return services.map((svc, i) => (
                      <tr key={`${b.id}-${i}`}>
                        <td>
                          <span className="cd-type-tag" style={{ marginRight: '0.5rem', fontSize: '0.75rem', padding: '2px 6px', borderRadius: 4, background: isTransport ? '#dbeafe' : '#f0fdf4', color: isTransport ? '#1d4ed8' : '#16a34a', fontWeight: 600 }}>
                            {isTransport ? (lang === 'ar' ? 'نقل' : 'Transport') : (lang === 'ar' ? 'خدمة' : 'Service')}
                          </span>
                          {translatePropertyName(svc, lang)}
                        </td>
                        <td>{lang === 'ar' ? toArabicNum(b.date) : b.date}</td>
                        <td>
                          <span className={`status-badge ${b.status === 'confirmed' || b.status === 'accepted' ? 'status-confirmed' : 'status-pending'}`}>
                            {getStatusLabel(b.status, lang)}
                          </span>
                        </td>
                        <td>
                          {i === 0 && (!b.status || b.status === 'pending') && (
                            <button
                              onClick={() => cancelOrder(b.id)}
                              disabled={cancelLoading === b.id}
                              style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', opacity: cancelLoading === b.id ? 0.6 : 1 }}
                            >
                              {cancelLoading === b.id ? '...' : (lang === 'ar' ? 'إلغاء' : 'Cancel')}
                            </button>
                          )}
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </>
  );
}