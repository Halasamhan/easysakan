import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { translations, getStatusLabel, toArabicNum } from '../data/Servicesdashboard';
import '../styles/ServicesDashboard.css';

const API = 'http://localhost/easysakan';

const FILTERS = ['all', 'pending', 'accepted'];

function StatusBadge({ status, lang }) {
  const s = status || 'pending';
  return <span className={`tv-badge ${s}`}>{getStatusLabel(s, lang)}</span>;
}

export default function ServicesDashboard() {
  const navigate        = useNavigate();
  const { user }        = useAuth();
  const { lang }        = useLanguage();
  const t               = translations[lang];

  const [orders,        setOrders]        = useState([]);
  const [serviceType,   setServiceType]   = useState('');
  const [loading,       setLoading]       = useState(true);
  const [filter,        setFilter]        = useState('all');
  const [search,         setSearch]         = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedOrder,  setSelectedOrder]  = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [priceInput,    setPriceInput]    = useState('');
  const [priceLoading,  setPriceLoading]  = useState(false);

  const fname = user?.name || localStorage.getItem('hf_fname') || 'Provider';

  useEffect(() => {
    if (!user) { navigate('/partner/login'); return; }
    fetch(`${API}/service_orders_handler.php`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (!data.success) { navigate('/partner/login'); return; }
        setOrders(data.orders || []);
        setServiceType(data.service_type || '');
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleAction = async (orderId, action) => {
    setActionLoading(orderId + action);
    try {
      const res  = await fetch(`${API}/service_orders_handler.php`, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify({ order_id: orderId, action }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.orderid === orderId ? { ...o, stat: data.status } : o));
        setSelectedOrder(prev => prev?.orderid === orderId ? { ...prev, stat: data.status } : prev);
      }
    } catch { /* silent */ }
    finally { setActionLoading(null); }
  };

  const stats = {
    total:    orders.length,
    pending:  orders.filter(o => !o.stat || o.stat === 'pending').length,
    accepted: orders.filter(o => o.stat === 'accepted').length,
  };

  const filtered = useMemo(() => {
    let list = filter === 'all' ? orders : orders.filter(o => (o.stat || 'pending') === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.services      || '').toLowerCase().includes(q) ||
        String(o.orderid).includes(q)
      );
    }
    if (locationSearch.trim()) {
      const q = locationSearch.toLowerCase();
      list = list.filter(o => (o.notes || '').toLowerCase().includes(q));
    }
    return list;
  }, [orders, filter, search, locationSearch]);

  const filterCount = (f) => f === 'all' ? orders.length : orders.filter(o => (o.stat || 'pending') === f).length;

  const handleUpdatePrice = async (orderId) => {
    const price = parseInt(priceInput, 10);
    if (!price || price <= 0) return;
    setPriceLoading(true);
    try {
      const res  = await fetch(`${API}/service_orders_handler.php`, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:        JSON.stringify({ order_id: orderId, action: 'update_price', new_price: price }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o.orderid === orderId ? { ...o, total: data.new_price } : o));
        setSelectedOrder(prev => prev?.orderid === orderId ? { ...prev, total: data.new_price } : prev);
        setEditingOrderId(null);
      }
    } catch { /* silent */ }
    finally { setPriceLoading(false); }
  };

  const startEditPrice = (order, e) => {
    if (e) e.stopPropagation();
    setEditingOrderId(order.orderid);
    setPriceInput(String(order.total));
  };

  const cancelEditPrice = (e) => {
    if (e) e.stopPropagation();
    setEditingOrderId(null);
    setPriceInput('');
  };

  const filterLabel = (f) => {
    const map = {
      all: t.stat_total, pending: t.stat_pending,
      accepted: t.stat_accepted, denied: t.stat_denied,
    };
    return map[f] ?? f;
  };

  return (
    <div className="tv-wrap" dir={t.direction}>
      <div className="tv-body">

        {/* Page header */}
        <div className="tv-page-header">
          <div>
            <h1 className="tv-page-title">
              🔧 {serviceType ? `${serviceType} ${lang === 'ar' ? 'طلبات' : 'Orders'}` : t.title}
            </h1>
            <p className="tv-page-sub">{t.welcome} {fname}. {t.desc}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="tv-stats">
          {[
            { label: t.stat_total,    value: stats.total,    icon: '📋', cls: 'blue'  },
            { label: t.stat_pending,  value: stats.pending,  icon: '⏳', cls: 'amber' },
            { label: t.stat_accepted, value: stats.accepted, icon: '✅', cls: 'green' },
          ].map(s => (
            <div key={s.label} className={`tv-stat-card ${s.cls}`}>
              <div className="tv-stat-icon">{s.icon}</div>
              <div>
                <div className="tv-stat-label">{s.label}</div>
                <div className="tv-stat-value">
                  {lang === 'ar' ? toArabicNum(s.value) : s.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="tv-toolbar">
          <div className="tv-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`tv-filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {filterLabel(f)} {lang === 'ar' ? toArabicNum(filterCount(f)) : filterCount(f)}
              </button>
            ))}
          </div>
          <input
            className="tv-search"
            placeholder={`🔍 ${lang === 'ar' ? 'ابحث باسم العميل أو الخدمة...' : 'Search by name or service...'}`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <input
            className="tv-search"
            placeholder={`📍 ${lang === 'ar' ? 'ابحث بالموقع...' : 'Search by location...'}`}
            value={locationSearch}
            onChange={e => setLocationSearch(e.target.value)}
          />
        </div>

        {/* Orders grid */}
        {loading ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#f9fafb', borderRadius: 12 }}>
            <p style={{ color: '#6b7280' }}>{t.empty_msg}</p>
          </div>
        ) : (
          <div className="tv-grid">
            {filtered.map(order => {
              const isPending = !order.stat || order.stat === 'pending';
              const initial   = (order.customer_name || '?')[0].toUpperCase();
              return (
                <div key={order.orderid} className="tv-card" onClick={() => setSelectedOrder(order)}>
                  <div className="tv-card-top">
                    <span className="tv-card-id">
                      {lang === 'ar' ? 'طلب' : 'ORDER'} #{lang === 'ar' ? toArabicNum(order.orderid) : order.orderid}
                    </span>
                    <StatusBadge status={order.stat} lang={lang} />
                  </div>

                  <div className="tv-card-body">
                    <div className="tv-card-customer">
                      <div className="tv-card-avatar">{initial}</div>
                      <div>
                        <div className="tv-card-cname">{order.customer_name || '—'}</div>
                        <div className="tv-card-phone">
                          {order.customer_phone || (lang === 'ar' ? 'لا يوجد هاتف' : 'No phone')}
                        </div>
                      </div>
                    </div>

                    <div className="tv-card-route" style={{ marginTop: '0.75rem' }}>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                        {t.th_serv}
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>
                        {order.services || '—'}
                      </div>
                    </div>

                    <div className="tv-card-meta" style={{ marginTop: '0.5rem' }}>
                      {order.booking_date && <span className="tv-meta-item"><span className="tv-meta-icon">📅</span>{order.booking_date}</span>}
                      {order.booking_time && <span className="tv-meta-item"><span className="tv-meta-icon">🕐</span>{order.booking_time}</span>}
                      <span className="tv-meta-item">
                        <span className="tv-meta-icon">💰</span>
                        {t.currency} {lang === 'ar' ? toArabicNum(order.total) : order.total}
                      </span>
                    </div>

                    {order.notes && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#6b7280', display: 'flex', alignItems: 'flex-start', gap: '0.25rem' }}>
                        <span>📍</span>
                        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {order.notes}
                        </span>
                      </div>
                    )}
                  </div>

                  {isPending && (
                    <div className="tv-card-actions" onClick={e => e.stopPropagation()}>
                      <button
                        className="tv-btn-accept"
                        disabled={!!actionLoading}
                        onClick={() => handleAction(order.orderid, 'accept')}
                      >
                        {actionLoading === order.orderid + 'accept' ? '...' : `✓ ${t.stat_accepted}`}
                      </button>
                    </div>
                  )}

                  {order.stat === 'accepted' && (
                    <div className="tv-card-actions" onClick={e => e.stopPropagation()}>
                      {editingOrderId === order.orderid ? (
                        <div className="tv-price-edit">
                          <input
                            type="number"
                            className="tv-price-input"
                            value={priceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            min="1"
                            placeholder={t.currency}
                            autoFocus
                          />
                          <button
                            className="tv-btn-save"
                            disabled={priceLoading}
                            onClick={() => handleUpdatePrice(order.orderid)}
                          >
                            {priceLoading ? '...' : t.save_price}
                          </button>
                          <button className="tv-btn-cancel" onClick={cancelEditPrice}>
                            {t.cancel}
                          </button>
                        </div>
                      ) : (
                        <button className="tv-btn-edit-price" onClick={e => startEditPrice(order, e)}>
                          ✏️ {t.edit_price}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedOrder && (
        <div className="tv-lightbox-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="tv-modal" onClick={e => e.stopPropagation()}>
            <div className="tv-modal-header">
              <div className="tv-modal-title">
                🔧 {lang === 'ar' ? 'طلب' : 'Order'} #{lang === 'ar' ? toArabicNum(selectedOrder.orderid) : selectedOrder.orderid}
              </div>
              <button className="tv-modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="tv-modal-body">
              <div className="tv-modal-section">
                <div className="tv-modal-label">{lang === 'ar' ? 'العميل' : 'Customer'}</div>
                <div className="tv-modal-value">{selectedOrder.customer_name || '—'}</div>
                <div className="tv-modal-value" style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  {selectedOrder.customer_phone || (lang === 'ar' ? 'لا يوجد هاتف' : 'No phone')}
                </div>
              </div>
              <div className="tv-modal-section">
                <div className="tv-modal-label">{t.th_cat}</div>
                <div className="tv-modal-value">{selectedOrder.order_type}</div>
              </div>
              <div className="tv-modal-section">
                <div className="tv-modal-label">{t.th_serv}</div>
                <div className="tv-modal-value">{selectedOrder.services || '—'}</div>
              </div>
              <div className="tv-modal-section">
                <div className="tv-modal-label">{t.th_date}</div>
                <div className="tv-modal-value">{selectedOrder.booking_date} {selectedOrder.booking_time}</div>
              </div>
              {selectedOrder.notes && (
                <div className="tv-modal-section">
                  <div className="tv-modal-label">📍 {t.th_location}</div>
                  <div className="tv-modal-value">{selectedOrder.notes}</div>
                </div>
              )}
              <div className="tv-modal-section">
                <div className="tv-modal-label">{t.th_total}</div>
                <div className="tv-modal-value" style={{ fontWeight: 700, color: '#1876d3' }}>
                  {t.currency} {lang === 'ar' ? toArabicNum(selectedOrder.total) : selectedOrder.total}
                </div>
              </div>

              {selectedOrder.stat === 'accepted' && (
                <div className="tv-modal-section">
                  <div className="tv-modal-label">{t.edit_price}</div>
                  {editingOrderId === selectedOrder.orderid ? (
                    <div className="tv-price-edit">
                      <input
                        type="number"
                        className="tv-price-input"
                        value={priceInput}
                        onChange={e => setPriceInput(e.target.value)}
                        min="1"
                        placeholder={t.currency}
                        autoFocus
                      />
                      <button
                        className="tv-btn-save"
                        disabled={priceLoading}
                        onClick={() => handleUpdatePrice(selectedOrder.orderid)}
                      >
                        {priceLoading ? '...' : t.save_price}
                      </button>
                      <button className="tv-btn-cancel" onClick={cancelEditPrice}>
                        {t.cancel}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="tv-btn-edit-price"
                      onClick={() => startEditPrice(selectedOrder, null)}
                    >
                      ✏️ {t.edit_price}
                    </button>
                  )}
                </div>
              )}
              <div className="tv-modal-section">
                <div className="tv-modal-label">{t.th_status}</div>
                <StatusBadge status={selectedOrder.stat} lang={lang} />
              </div>

              {(!selectedOrder.stat || selectedOrder.stat === 'pending') && (
                <div className="tv-modal-actions">
                  <button
                    className="tv-btn-accept"
                    disabled={!!actionLoading}
                    onClick={() => handleAction(selectedOrder.orderid, 'accept')}
                  >
                    ✓ {t.stat_accepted}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
