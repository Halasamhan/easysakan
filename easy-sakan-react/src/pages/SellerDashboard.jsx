import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../context/LanguageContext';
import { translations, toArabicNum } from '../data/sellerdashboard';
import "./SellerHub.css";

const API = "http://localhost/easysakan";

const fmt = (n, lang, t) => {
  const num = Number(n) || 0;
  const val = (v) => lang === 'ar' ? toArabicNum(v) : v;
  const suffix = (limit, s) => num >= limit ? s : "";

  if (num >= 1_000_000) return `${t.currency} ${val((num / 1_000_000).toFixed(1))}${t.suffix_m}`;
  if (num >= 1_000)     return `${t.currency} ${val((num / 1_000).toFixed(0))}${t.suffix_k}`;
  return `${t.currency} ${val(num)}`;
};

const imgUrl = (path) =>
  path ? `${API}/${path.replace(/\\/g, "/").replace(/ /g, "%20")}` : null;

function Icon({ name, size = 20, className = "" }) {
  return (
    <iconify-icon icon={`lucide:${name}`} width={size} height={size} className={className} />
  );
}

function useToast() {
  const [msg, setMsg]         = useState("");
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const show = (text, error = false) => {
    setMsg(text); setIsError(error); setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  const ToastEl = (
    <div className={`toast ${visible ? "toast-visible" : ""}`} style={isError ? { background: "#dc2626" } : {}}>
      <Icon name={isError ? "x-circle" : "check-circle"} size={16} />
      <span>{msg}</span>
    </div>
  );

  return { show, ToastEl };
}

function EditPriceModal({ unit, onClose, onSave, t }) {
  const [price, setPrice]   = useState(unit.price);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!price || Number(price) <= 0) return;
    setSaving(true);
    await onSave(unit.unitID, Number(price));
    setSaving(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t.modal_update_price}</h3>
          <button className="modal-close" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <p style={{ fontSize: "0.9rem", color: "#6b7280", margin: "0 0 1rem" }}>{unit.name}</p>
        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>{t.modal_new_price} ({t.currency})</label>
        <input className="modal-input" type="number" value={price} min="1" onChange={(e) => setPrice(e.target.value)} />
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onClose}>{t.cancel}</button>
          <button className="modal-btn-save" onClick={handleSave} disabled={saving}>{saving ? t.modal_saving : t.modal_save}</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ unit, onClose, onConfirm, t }) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm(unit.unitID);
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t.modal_delete_title}</h3>
          <button className="modal-close" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <p style={{ fontSize: "0.95rem", color: "#374151", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
          {t.modal_delete_confirm} <strong>{unit.name}</strong>?
        </p>
        <div className="modal-actions">
          <button className="modal-btn-cancel" onClick={onClose}>{t.cancel}</button>
          <button className="modal-btn-delete" onClick={handleConfirm} disabled={deleting}>{deleting ? t.modal_deleting : t.modal_delete_btn}</button>
        </div>
      </div>
    </div>
  );
}

function SellerProfile({ seller, onCopy, t, lang }) {
  if (!seller) return <div className="profile-card glass anim-fade-up" style={{ padding: "2rem", textAlign: "center" }}>{t.loading}</div>;

  return (
    <div className="profile-card glass anim-fade-up">
      <div className="profile-cover">
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#082d56,#1876d3)" }} />
        <div className="profile-cover-overlay" />
      </div>
      <div className="profile-body">
        <div className="profile-avatar-wrap">
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#1876d3,#082d56)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.6rem", fontWeight: 700 }}>
            {seller.fname?.[0] || "S"}{seller.lname?.[0] || ""}
          </div>
          <div className="profile-online-dot" />
        </div>
        <h2 className="profile-name">{seller.fname} {seller.lname}</h2>
        <p className="profile-title">{t.seller_title}</p>
        <p className="profile-agency"><Icon name="map-pin" size={13} />{seller.location}</p>
        <div className="profile-contacts">
          <button className="contact-btn" onClick={() => onCopy(seller.email)}>
            <Icon name="mail" size={16} className="contact-icon" />
            <span className="contact-text">{seller.email || "—"}</span>
            <Icon name="copy" size={14} className="contact-copy" />
          </button>
          <button className="contact-btn" onClick={() => onCopy(String(seller.phone || ""))}>
            <Icon name="phone" size={16} className="contact-icon" />
            <span className="contact-text">{seller.phone || "—"}</span>
            <Icon name="copy" size={14} className="contact-copy" />
          </button>
        </div>
        <div className="profile-details">
          {[{ icon: "map-pin", label: t.location, val: seller.location || "—" }, { icon: "layers", label: t.units, val: seller.unitCount || "—" }].map((d) => (
            <div key={d.label} className="profile-detail-item">
              <div className="profile-detail-label"><Icon name={d.icon} size={12} />{d.label}</div>
              <p className="profile-detail-value">{d.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, delay, lang }) {
  const displayVal = (typeof value === 'number' && lang === 'ar') ? toArabicNum(value) : value;
  return (
    <div className={`stat-card glass anim-fade-up ${delay}`}>
      <div className={`stat-icon stat-icon-${color}`}><Icon name={icon} size={22} /></div>
      <div><p className="stat-label">{label}</p><p className="stat-value">{displayVal}</p></div>
    </div>
  );
}

function SoldSummary({ soldUnits, t, lang }) {
  if (!soldUnits.length) return null;
  const totalValue = soldUnits.reduce((s, u) => s + Number(u.price || 0), 0);
  const barColor = (price) => price >= 1_000_000 ? "green" : price >= 500_000 ? "amber" : "red";

  return (
    <div className="sold-summary glass anim-fade-up">
      <h3 className="sold-summary-title"><Icon name="bar-chart-3" size={16} className="sold-summary-icon" />{t.sold_overview}</h3>
      <div className="sold-summary-grid">
        <div className="sold-summary-item">
          <p className="sold-summary-label">{t.sold_count}</p>
          <p className="sold-summary-value">
            {(typeof soldUnits.length === 'number' && lang === 'ar') ? toArabicNum(soldUnits.length) : soldUnits.length}
          </p>
        </div>
        <div className="sold-summary-item"><p className="sold-summary-label">{t.sold_total}</p><p className="sold-summary-value sold-summary-value-green">{fmt(totalValue, lang, t)}</p></div>
      </div>
      <div className="perf-bars">
        {soldUnits.map((u, i) => (
          <div key={u.unitID} className="perf-bar-row">
            <span className="perf-bar-label">{u.name.split(" ").slice(0, 2).join(" ")}</span>
            <div className="perf-bar-track">
              <div className={`perf-bar-fill perf-bar-${barColor(Number(u.price))}`} style={{ width: `${Math.min((Number(u.price) / 3_000_000) * 100, 100)}%`, animationDelay: `${0.3 + i * 0.1}s` }} />
            </div>
            <span className="perf-bar-val">{fmt(u.price, lang, t)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ p, mode, onEditPrice, onMarkSold, onMarkAvailable, onDelete, t, lang }) {
  const isSold = mode === "sold";
  const cover  = imgUrl(p.cover_image);

  return (
    <div className="property-card glass anim-scale-in" data-name={`${p.name} ${p.zone} ${p.type}`}>
      <div className="card-img">
        {cover ? <img src={cover} alt={p.name} loading="lazy" /> : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#e3f2fd,#1876d3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="home" size={40} />
          </div>
        )}
        <div className="card-img-overlay" />
        <div className="card-badges">
          <span className={`badge ${isSold ? "badge-sold" : "badge-sale"}`}>{isSold ? t.badge_sold : t.badge_avail}</span>
          <span className="badge badge-type">{p.type}</span>
        </div>
        {isSold && <div className="card-closed-badge"><Icon name="check-circle" size={14} /> {t.badge_closed}</div>}
        <div className="card-price"><p className="card-price-value">{fmt(p.price, lang, t)}</p></div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{p.name}</h3>
        <p className="card-location"><Icon name="map-pin" size={13} />{p.zone}</p>
        <div className="card-specs">
          {p.space && <span className="card-spec"><Icon name="maximize-2" size={14} />{lang === 'ar' ? toArabicNum(p.space) : p.space} {t.unit_m}</span>}
          <span className="card-spec"><Icon name="tag" size={14} />{p.type}</span>
        </div>
        {p.description && (
          <div className="card-meta" style={{ marginTop: "0.4rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>{p.description.slice(0, 80)}{p.description.length > 80 ? "…" : ""}</span>
          </div>
        )}
        <div className="card-actions">
          <button className="card-action-btn btn-price" onClick={() => onEditPrice(p)}><Icon name="pencil" size={13} /> {t.btn_price}</button>
          {isSold ? (
            <button className="card-action-btn btn-available" onClick={() => onMarkAvailable(p.unitID)}><Icon name="rotate-ccw" size={13} /> {t.btn_mark_avail}</button>
          ) : (
            <button className="card-action-btn btn-sold" onClick={() => onMarkSold(p.unitID)}><Icon name="badge-check" size={13} /> {t.btn_mark_sold}</button>
          )}
          <button className="card-action-btn btn-delete" onClick={() => onDelete(p)}><Icon name="trash-2" size={13} /></button>
        </div>
      </div>
    </div>
  );
}

function Tab({ active, onClick, icon, label, count, lang }) {
  const displayCount = (typeof count === 'number' && lang === 'ar') ? toArabicNum(count) : count;
  return (
    <button className={`tab-btn ${active ? "tab-active" : ""}`} onClick={onClick}>
      <Icon name={icon} size={16} />{label}<span className="tab-count">{displayCount}</span>
    </button>
  );
}

export default function SellerHub() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [units,      setUnits]      = useState([]);
  const [seller,     setSeller]     = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState("available");
  const [search,     setSearch]     = useState("");
  const [editUnit,   setEditUnit]   = useState(null);
  const [deleteUnit, setDeleteUnit] = useState(null);

  const { show, ToastEl } = useToast();

  // FIXED: Added [lang] to the dependency array so it updates when language changes
  useEffect(() => {
    fetch(`${API}/seller_units_handler.php`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) { navigate("/login"); return; }
        setUnits(data.units || []);
        setSeller({ 
          fname: localStorage.getItem("hf_fname") || "Seller", 
          lname: "", 
          email: "", 
          phone: "", 
          location: lang === 'ar' ? 'مصر' : 'Egypt',
          unitCount: data.total || 0 
        });
      })
      .catch(() => show(t.toast_err, true))
      .finally(() => setLoading(false));
  }, [lang, navigate, t.toast_err, show]); // <--- ADDED lang HERE

  const availableUnits = units.filter((u) => u.stat !== "sold");
  const soldUnits      = units.filter((u) => u.stat === "sold");
  const currentList    = tab === "available" ? availableUnits : soldUnits;

  const filtered = useMemo(() => {
    if (!search.trim()) return currentList;
    const q = search.toLowerCase();
    return currentList.filter((u) => u.name.toLowerCase().includes(q) || u.zone.toLowerCase().includes(q) || u.type.toLowerCase().includes(q));
  }, [currentList, search]);

  const apiPost = async (action, body) => {
    const res = await fetch(`${API}/seller_units_handler.php?action=${action}`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return res.json();
  };

  const handleUpdatePrice = async (unitID, price) => {
    const data = await apiPost("update_price", { unitID, price });
    if (data.success) { setUnits((prev) => prev.map((u) => u.unitID === unitID ? { ...u, price } : u)); show(t.toast_price); }
    else show(data.message, true);
  };

  const handleMarkSold = async (unitID) => {
    const data = await apiPost("mark_sold", { unitID });
    if (data.success) { setUnits((prev) => prev.map((u) => u.unitID === unitID ? { ...u, stat: "sold" } : u)); show(t.toast_sold); }
    else show(data.message, true);
  };

  const handleMarkAvailable = async (unitID) => {
    const data = await apiPost("mark_available", { unitID });
    if (data.success) { setUnits((prev) => prev.map((u) => u.unitID === unitID ? { ...u, stat: "available" } : u)); show(t.toast_avail); }
    else show(data.message, true);
  };

  const handleDelete = async (unitID) => {
    const data = await apiPost("delete", { unitID });
    if (data.success) { setUnits((prev) => prev.filter((u) => u.unitID !== unitID)); show(t.toast_delete); }
    else show(data.message, true);
  };

  const handleCopy = (text) => { if (!text || text === "—") return; navigator.clipboard?.writeText(text); show(t.toast_copy); };

  const tabs = [
    { key: "available", icon: "tag",        label: t.tab_avail, count: availableUnits.length },
    { key: "sold",      icon: "badge-check", label: t.tab_sold,  count: soldUnits.length },
  ];

  const portfolioValue = availableUnits.reduce((s, u) => s + Number(u.price || 0), 0);

  return (
    <div className="sellerhub-wrapper" dir={t.direction}>
      {ToastEl}
      {editUnit   && <EditPriceModal unit={editUnit}   onClose={() => setEditUnit(null)}   onSave={handleUpdatePrice} t={t} />}
      {deleteUnit && <ConfirmModal   unit={deleteUnit} onClose={() => setDeleteUnit(null)} onConfirm={handleDelete} t={t} />}

      <nav className="top-nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon"><Icon name="layout-dashboard" size={18} /></div>
            <span className="nav-logo-text">{t.brand}</span>
          </div>
          <div className="nav-search">
            <Icon name="search" size={16} className="nav-search-icon" />
            <input placeholder={t.search_ph} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="nav-right">
            <button
              onClick={() => navigate('/listings')}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.45rem 1rem", background: "#1876d3", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
            >
              <Icon name="home" size={15} /> {t.listings}
            </button>
          </div>
        </div>
      </nav>

      <div className="app-layout">
        <div className="mobile-search">
          <Icon name="search" size={16} style={{ color: "#6b7280" }} />
          <input placeholder={t.search_ph} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="main-grid">
          <aside className="sidebar">
            <SellerProfile seller={seller} onCopy={handleCopy} t={t} lang={lang} />
            <StatCard icon="home"        label={t.stat_avail} value={availableUnits.length} color="green" delay="d1" lang={lang} />
            <StatCard icon="badge-check" label={t.stat_sold}  value={soldUnits.length}      color="blue"  delay="d2" lang={lang} />
            <StatCard icon="layers"      label={t.stat_total} value={units.length}          color="amber" delay="d3" lang={lang} />
            <StatCard icon="dollar-sign" label={t.stat_val}   value={fmt(portfolioValue, lang, t)} color="red"   delay="d4" lang={lang} />
          </aside>
          <section className="main-content">
            <div className="page-heading anim-fade-up">
              <h1>{t.page_title} <span className="page-heading-accent">{t.page_accent}</span></h1>
              <p className="page-heading-sub">{t.page_sub}</p>
            </div>
            <div className="tabs-row anim-fade-up d1">
              {tabs.map((tabItem) => <Tab key={tabItem.key} active={tab === tabItem.key} onClick={() => setTab(tabItem.key)} {...tabItem} lang={lang} />)}
            </div>
            {tab === "sold" && <SoldSummary soldUnits={soldUnits} t={t} lang={lang} />}
            {loading ? (
              <div className="empty-state glass"><p className="empty-text">{t.loading}</p></div>
            ) : filtered.length > 0 ? (
              <div className="property-grid" key={tab}>
                {filtered.map((p) => (
                  <PropertyCard key={p.unitID} p={p} mode={tab === "sold" ? "sold" : "available"}
                    onEditPrice={(u) => setEditUnit(u)} onMarkSold={handleMarkSold}
                    onMarkAvailable={handleMarkAvailable} onDelete={(u) => setDeleteUnit(u)} t={t} lang={lang} />
                ))}
              </div>
            ) : (
              <div className="empty-state glass">
                <Icon name="search-x" size={48} className="empty-icon" />
                <p className="empty-text">{search ? t.empty_search : t.empty_cat}</p>
                <button className="empty-clear" onClick={() => setSearch("")}>{t.clear_search}</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}