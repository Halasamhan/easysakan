import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { translations, getStatusLabel, translatePackage, formatTime } from '../data/Transportationdashboard';
import './TransportVendor.css';

const API = 'http://localhost/easysakan';

function parseNotes(raw) {
  if (!raw) return {};
  const r = {};
  const m = (regex) => { const x = raw.match(regex); return x ? x[1].trim() : null; };
  r.pickup   = m(/From:\s*([^|]+)/);
  r.dropoff  = m(/To:\s*([^|]+)/);
  r.distance = m(/distance_km:\s*([\d.]+)/);
  const pc = raw.match(/pickup_coords:\s*([\d.-]+),([\d.-]+)/);
  if (pc) r.pickup_coords = { lat: pc[1], lng: pc[2] };
  const dc = raw.match(/dropoff_coords:\s*([\d.-]+),([\d.-]+)/);
  if (dc) r.dropoff_coords = { lat: dc[1], lng: dc[2] };
  const userParts = raw.split(' | ').filter(p =>
    !p.startsWith('From:') && !p.startsWith('To:') &&
    !p.startsWith('pickup_coords:') && !p.startsWith('dropoff_coords:') &&
    !p.startsWith('distance_km:')
  );
  if (userParts.length) r.user_notes = userParts.join(' | ');
  return r;
}

function StatusBadge({ status, t }) {
  const s = status || 'pending';
  return <span className={`tv-badge ${s}`}>{getStatusLabel(s, t._lang)}</span>;
}

function OrderCard({ order, onSelect, onAction, actionLoading, t }) {
  const notes    = useMemo(() => parseNotes(order.notes), [order.notes]);
  const isPending = !order.status || order.status === 'pending';
  const initial  = (order.customer_name || '?')[0].toUpperCase();
  const stopProp = (fn) => (e) => { e.stopPropagation(); fn(); };

  return (
    <div className="tv-card" onClick={() => onSelect(order)}>
      <div className="tv-card-top">
        <span className="tv-card-id">{t.order_id} #{order.id}</span>
        <StatusBadge status={order.status} t={t} />
      </div>

      <div className="tv-card-body">
        <div className="tv-card-customer">
          <div className="tv-card-avatar">{initial}</div>
          <div>
            <div className="tv-card-cname">{order.customer_name || '—'}</div>
            <div className="tv-card-phone">{order.phone || t.no_phone}</div>
          </div>
        </div>

        <div className="tv-card-route">
          <div className="tv-route-row">
            <div className="tv-route-dot from" />
            <div>
              <div className="tv-route-label">{t.pickup}</div>
              <div className="tv-route-text">{notes.pickup || '—'}</div>
            </div>
          </div>
          <div className="tv-route-line" style={{ marginLeft: 4 }} />
          <div className="tv-route-row">
            <div className="tv-route-dot to" />
            <div>
              <div className="tv-route-label">{t.dropoff}</div>
              <div className="tv-route-text">{notes.dropoff || '—'}</div>
            </div>
          </div>
        </div>

        <div className="tv-card-meta">
          <span className="tv-meta-item">
            <span className="tv-meta-icon">📦</span>
            {translatePackage(order.package, t._lang) || '—'}
          </span>
          {order.move_date && <span className="tv-meta-item"><span className="tv-meta-icon">📅</span>{order.move_date}</span>}
          {order.move_time && <span className="tv-meta-item"><span className="tv-meta-icon">🕐</span>{formatTime(order.move_time, t._lang)}</span>}
          {notes.distance && <span className="tv-meta-item"><span className="tv-meta-icon">📏</span>{notes.distance} {t.unit_km}</span>}
        </div>
      </div>

      <div className="tv-card-footer">
        <span className="tv-card-price">{t.currency} {Number(order.total).toLocaleString()}</span>
        {isPending ? (
          <div className="tv-card-actions">
            <button
              className="tv-btn-accept"
              disabled={actionLoading === order.id + 'accept'}
              onClick={stopProp(() => onAction(order.id, 'accept'))}
            >
              {actionLoading === order.id + 'accept' ? '…' : t.btn_accept}
            </button>
          </div>
        ) : (
          <span className="tv-meta-item" style={{ fontSize: '.82rem', color: 'var(--gray-400)' }}>
            {t.view_details}
          </span>
        )}
      </div>
    </div>
  );
}

function DetailModal({ order, onClose, onAction, actionLoading, t }) {
  const notes    = useMemo(() => parseNotes(order.notes), [order.notes]);
  const isPending = !order.status || order.status === 'pending';
  const initial  = (order.customer_name || '?')[0].toUpperCase();
  const [packageName, ...addonsParts] = (order.package || '').split(' + ');
  const addons = addonsParts.join(' + ');

  return (
    <div className="tv-modal-overlay" onClick={onClose}>
      <div className="tv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tv-modal-header">
          <div className="tv-modal-title">
            🚛 {t.order_id} #{order.id}
            <StatusBadge status={order.status} t={t} />
          </div>
          <button className="tv-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="tv-modal-body">
          <div>
            <div className="tv-section-label">{t.modal_customer}</div>
            <div className="tv-info-grid">
              <div className="tv-info-item tv-card-customer" style={{ gridColumn: 'span 2', padding: '1rem' }}>
                <div className="tv-card-avatar" style={{ width: 48, height: 48, fontSize: '1.1rem' }}>{initial}</div>
                <div>
                  <div className="tv-info-val">{order.customer_name || '—'}</div>
                  <div style={{ fontSize: '.82rem', color: 'var(--gray-400)', marginTop: 2 }}>{order.email || t.no_email}</div>
                </div>
              </div>
              <div className="tv-info-item">
                <div className="tv-info-key">{t.label_phone}</div>
                <div className="tv-info-val">{order.phone || '—'}</div>
              </div>
              <div className="tv-info-item">
                <div className="tv-info-key">{t.label_email}</div>
                <div className="tv-info-val" style={{ fontSize: '.82rem' }}>{order.email || '—'}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="tv-section-label">{t.modal_route}</div>
            <div className="tv-route-card">
              <div className="tv-route-card-row">
                <div className="tv-route-card-dot from" />
                <div className="tv-route-card-text">
                  <strong>{t.pickup}</strong>
                  {notes.pickup || '—'}
                </div>
              </div>
              <div className="tv-route-card-connector" style={{ marginLeft: 5 }} />
              <div className="tv-route-card-row">
                <div className="tv-route-card-dot to" />
                <div className="tv-route-card-text">
                  <strong>{t.dropoff}</strong>
                  {notes.dropoff || '—'}
                </div>
              </div>
              {notes.distance && (
                <div className="tv-distance-pill" style={{ marginTop: 6 }}>
                  📏 {notes.distance} {t.unit_km}
                </div>
              )}
              {notes.pickup_coords && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${notes.pickup_coords.lat},${notes.pickup_coords.lng}&destination=${notes.dropoff_coords?.lat},${notes.dropoff_coords?.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '.8rem', color: 'var(--blue)', textDecoration: 'none', fontWeight: 600, marginTop: 6 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {t.open_maps}
                </a>
              )}
            </div>
          </div>

          <div>
            <div className="tv-section-label">{t.modal_package}</div>
            <div className="tv-info-grid">
              <div className="tv-info-item">
                <div className="tv-info-key">{t.label_package ?? 'Package'}</div>
                <div className="tv-info-val">{translatePackage(packageName, t._lang) || '—'}</div>
              </div>
              {addons && (
                <div className="tv-info-item">
                  <div className="tv-info-key">{t.label_addons}</div>
                  <div className="tv-info-val" style={{ fontSize: '.83rem' }}>{translatePackage(addons, t._lang)}</div>
                </div>
              )}
              <div className="tv-info-item">
                <div className="tv-info-key">{t.label_date}</div>
                <div className="tv-info-val">{order.move_date || '—'}</div>
              </div>
              <div className="tv-info-item">
                <div className="tv-info-key">{t.label_time}</div>
                <div className="tv-info-val">{formatTime(order.move_time, t._lang) || '—'}</div>
              </div>
              <div className="tv-info-item">
                <div className="tv-info-key">{t.label_total}</div>
                <div className="tv-info-val" style={{ color: 'var(--blue)', fontSize: '1.1rem' }}>
                  {t.currency} {Number(order.total).toLocaleString()}
                </div>
              </div>
              {notes.user_notes && (
                <div className="tv-info-item full">
                  <div className="tv-info-key">{t.label_notes}</div>
                  <div className="tv-info-val" style={{ fontSize: '.85rem', fontWeight: 400 }}>{notes.user_notes}</div>
                </div>
              )}
            </div>
          </div>

          {!isPending && (
            <div className={`tv-resolved ${order.status}`}>
              {order.status === 'accepted' ? t.msg_accepted : t.msg_denied}
            </div>
          )}
        </div>

        <div className="tv-modal-actions">
          {isPending ? (
            <button
              className="tv-action-btn accept"
              disabled={actionLoading === order.id + 'accept'}
              onClick={() => onAction(order.id, 'accept')}
            >
              {actionLoading === order.id + 'accept' ? t.modal_accepting : t.btn_accept}
            </button>
          ) : (
            <button className="tv-action-btn close-btn" onClick={onClose}>{t.modal_close}</button>
          )}
        </div>
      </div>
    </div>
  );
}

const FILTERS = ['all', 'pending', 'accepted'];

export default function TransportationDashboard() {
  const navigate       = useNavigate();
  const { user }       = useAuth();
  const { lang }       = useLanguage();
  const t              = { ...translations[lang], _lang: lang };

  const [orders,        setOrders]        = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [filter,        setFilter]        = useState('all');
  const [search,         setSearch]         = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedOrder,  setSelectedOrder]  = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const fname = user?.name || localStorage.getItem('hf_fname') || 'Provider';

  useEffect(() => {
    fetch(`${API}/transport_orders.php`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        if (!data.success) { navigate('/login'); return; }
        setOrders(data.orders || []);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (orderId, action) => {
    setActionLoading(orderId + action);
    try {
      const res  = await fetch(`${API}/transport_orders.php`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:    JSON.stringify({ order_id: orderId, action }),
      });
      const data = await res.json();
      if (data.success) {
        const newStatus = data.status;
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        setSelectedOrder(prev => prev?.id === orderId ? { ...prev, status: newStatus } : prev);
      }
    } catch { /* silent */ }
    finally { setActionLoading(null); }
  };

  const stats = {
    total:    orders.length,
    pending:  orders.filter(o => !o.status || o.status === 'pending').length,
    accepted: orders.filter(o => o.status === 'accepted').length,
  };

  const filtered = useMemo(() => {
    let list = filter === 'all' ? orders : orders.filter(o => (o.status || 'pending') === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(o =>
        (o.customer_name || '').toLowerCase().includes(q) ||
        (o.package       || '').toLowerCase().includes(q) ||
        (o.notes         || '').toLowerCase().includes(q) ||
        String(o.id).includes(q)
      );
    }
    if (locationSearch.trim()) {
      const q = locationSearch.toLowerCase();
      list = list.filter(o => (o.notes || '').toLowerCase().includes(q));
    }
    return list;
  }, [orders, filter, search, locationSearch]);

  const filterLabel = (f) => {
    const map = {
      all: t.filter_all, pending: t.filter_pending,
      accepted: t.filter_accepted, denied: t.filter_denied,
    };
    return map[f] ?? f;
  };

  const filterCount = (f) => f === 'all' ? orders.length : orders.filter(o => (o.status || 'pending') === f).length;

  return (
    <div className="tv-wrap" dir={t.direction}>
      <div className="tv-body">
        <div className="tv-heading">
          <h1>{t.title}</h1>
          <p>{t.subtitle.replace('{name}', fname) || `Hello, ${fname}. ${t.subtitle}`}</p>
        </div>

        <div className="tv-stats">
          {[
            { key: 'total',    icon: '📋', label: t.stat_total,    value: stats.total    },
            { key: 'pending',  icon: '⏳', label: t.stat_pending,  value: stats.pending  },
            { key: 'accepted', icon: '✅', label: t.stat_accepted, value: stats.accepted },
          ].map(s => (
            <div key={s.key} className={`tv-stat ${s.key}`} onClick={() => setFilter(s.key)} style={{ cursor: 'pointer' }}>
              <div className="tv-stat-icon">{s.icon}</div>
              <div>
                <div className="tv-stat-label">{s.label}</div>
                <div className="tv-stat-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="tv-toolbar">
          <div className="tv-tabs">
            {FILTERS.map(f => (
              <button key={f} className={`tv-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {filterLabel(f)}
                <span className="tv-tab-count">{filterCount(f)}</span>
              </button>
            ))}
          </div>
          <div className="tv-search">
            <span className="tv-search-icon">🔍</span>
            <input
              placeholder={t.search_ph}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="tv-search">
            <span className="tv-search-icon">📍</span>
            <input
              placeholder={t._lang === 'ar' ? 'ابحث بالموقع...' : 'Search by location...'}
              value={locationSearch}
              onChange={e => setLocationSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="tv-empty"><div className="tv-empty-icon">⏳</div><p>{t.loading}</p></div>
        ) : filtered.length === 0 ? (
          <div className="tv-empty">
            <div className="tv-empty-icon">📭</div>
            <p>{search ? t.empty_search : `${t.empty_cat} ${filter === 'all' ? '' : filterLabel(filter)} ${t.empty_cat_suffix}`}</p>
          </div>
        ) : (
          <div className="tv-grid">
            {filtered.map(o => (
              <OrderCard
                key={o.id}
                order={o}
                onSelect={setSelectedOrder}
                onAction={handleAction}
                actionLoading={actionLoading}
                t={t}
              />
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <DetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onAction={handleAction}
          actionLoading={actionLoading}
          t={t}
        />
      )}
    </div>
  );
}
