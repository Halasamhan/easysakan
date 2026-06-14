import { useState, useMemo } from "react";
import { seller, soldProperties, forSaleProperties, forRentProperties } from "../data/SellerHubData";

import Header from '../components/Header';
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import "./SellerHub.css";

/* ── Helpers ── */
const fmt = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(0)}K`
    : `$${n}`;

const bedsLabel = (n) => (n === 0 ? "Studio" : `${n} Bed${n > 1 ? "s" : ""}`);

/* ── Icon Component ── */
function Icon({ name, size = 20, className = "" }) {
  return (
    <iconify-icon
      icon={`lucide:${name}`}
      width={size}
      height={size}
      className={className}
    />
  );
}

/* ── Toast ── */
function useToast() {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  const show = (text) => {
    setMsg(text);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  const ToastEl = (
    <div className={`toast ${visible ? "toast-visible" : ""}`}>
      <Icon name="check-circle" size={16} />
      <span>{msg}</span>
    </div>
  );

  return { show, ToastEl };
}

/* ══════════════════════════════════════
   SELLER PROFILE
   ══════════════════════════════════════ */
function SellerProfile({ onCopy }) {
  return (
    <div className="profile-card glass anim-fade-up">
     
    
      <div className="profile-cover">
        <img src={seller.cover} alt="" />
        <div className="profile-cover-overlay" />
      </div>

      <div className="profile-body">
        <div className="profile-avatar-wrap">
          <img src={seller.avatar} alt={seller.name} />
          <div className="profile-online-dot" />
        </div>

        <h2 className="profile-name">{seller.name}</h2>
        <p className="profile-title">{seller.title}</p>
        <p className="profile-agency">
          <Icon name="building-2" size={13} />
          {seller.agency}
        </p>

        <div className="profile-rating">
          <div className="profile-stars">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                size={14}
                className={i < Math.floor(seller.rating) ? "" : "profile-star-empty"}
              />
            ))}
          </div>
          <span className="profile-rating-text">
            {seller.rating} ({seller.reviews} reviews)
          </span>
        </div>

        <div className="profile-contacts">
          <button className="contact-btn" onClick={() => onCopy(seller.email)}>
            <Icon name="mail" size={16} className="contact-icon" />
            <span className="contact-text">{seller.email}</span>
            <Icon name="copy" size={14} className="contact-copy" />
          </button>
          <button className="contact-btn" onClick={() => onCopy(seller.phone)}>
            <Icon name="phone" size={16} className="contact-icon" />
            <span className="contact-text">{seller.phone}</span>
            <Icon name="copy" size={14} className="contact-copy" />
          </button>
        </div>

        <div className="profile-details">
          {[
            { icon: "hash", label: "License", val: seller.license },
            { icon: "calendar", label: "Since", val: seller.since },
            { icon: "handshake", label: "Deals", val: seller.deals },
            { icon: "trending-up", label: "Volume", val: seller.revenue },
          ].map((d) => (
            <div key={d.label} className="profile-detail-item">
              <div className="profile-detail-label">
                <Icon name={d.icon} size={12} />
                {d.label}
              </div>
              <p className="profile-detail-value">{d.val}</p>
            </div>
          ))}
        </div>

        <div className="profile-specialties">
          <p className="profile-specialties-label">Specialties</p>
          <div className="profile-specialties-list">
            {seller.specialties.map((s) => (
              <span key={s} className="specialty-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   STAT CARD
   ══════════════════════════════════════ */
function StatCard({ icon, label, value, color, delay }) {
  return (
    <div className={`stat-card glass anim-fade-up ${delay}`}>
      <div className={`stat-icon stat-icon-${color}`}>
        <Icon name={icon} size={22} />
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   SOLD SUMMARY
   ══════════════════════════════════════ */
function SoldSummary() {
  const totalAsked = soldProperties.reduce((s, p) => s + p.price, 0);
  const totalSold = soldProperties.reduce((s, p) => s + p.soldPrice, 0);

  const barColor = (d) => (d <= 15 ? "green" : d <= 40 ? "amber" : "red");

  return (
    <div className="sold-summary glass anim-fade-up">
      <h3 className="sold-summary-title">
        <Icon name="bar-chart-3" size={16} className="sold-summary-icon" />
        Sales Performance
      </h3>
      <div className="sold-summary-grid">
        <div className="sold-summary-item">
          <p className="sold-summary-label">Total Asked</p>
          <p className="sold-summary-value">{fmt(totalAsked)}</p>
        </div>
        <div className="sold-summary-item">
          <p className="sold-summary-label">Total Sold</p>
          <p className="sold-summary-value sold-summary-value-green">
            {fmt(totalSold)}
          </p>
        </div>
      </div>

      <div className="perf-bars">
        {soldProperties.map((p, i) => (
          <div key={p.id} className="perf-bar-row">
            <span className="perf-bar-label">
              {p.name.split(" ").slice(0, 2).join(" ")}
            </span>
            <div className="perf-bar-track">
              <div
                className={`perf-bar-fill perf-bar-${barColor(p.daysOnMarket)}`}
                style={{
                  width: `${Math.min((p.daysOnMarket / 60) * 100, 100)}%`,
                  animationDelay: `${0.3 + i * 0.1}s`,
                }}
              />
            </div>
            <span className="perf-bar-val">{p.daysOnMarket}d</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PROPERTY CARD
   ══════════════════════════════════════ */
function PropertyCard({ p, mode }) {
  const isSold = mode === "sold";
  const isRent = mode === "rent";
  const badgeCls = isSold ? "badge-sold" : isRent ? "badge-rent" : "badge-sale";
  const badgeLabel = isSold ? "Sold" : isRent ? "For Rent" : "For Sale";

  return (
    <div
      className="property-card glass anim-scale-in"
      data-name={`${p.name} ${p.location} ${p.type}`}
    >
      <div className="card-img">
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="card-img-overlay" />
        <div className="card-badges">
          <span className={`badge ${badgeCls}`}>{badgeLabel}</span>
          <span className="badge badge-type">{p.type}</span>
        </div>
        {isSold && (
          <div className="card-closed-badge">
            <Icon name="check-circle" size={14} /> Closed
          </div>
        )}
        <div className="card-price">
          <p className="card-price-value">
            {isSold
              ? fmt(p.soldPrice)
              : isRent
              ? `$${p.rent.toLocaleString()}/mo`
              : fmt(p.price)}
          </p>
          {isSold && p.soldPrice !== p.price && (
            <p className="card-price-original">{fmt(p.price)}</p>
          )}
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{p.name}</h3>
        <p className="card-location">
          <Icon name="map-pin" size={13} />
          {p.location}
        </p>

        <div className="card-specs">
          <span className="card-spec">
            <Icon name="bed-double" size={14} />
            {bedsLabel(p.beds)}
          </span>
          <span className="card-spec">
            <Icon name="bath" size={14} />
            {p.baths} Bath{p.baths > 1 ? "s" : ""}
          </span>
          <span className="card-spec">
            <Icon name="maximize-2" size={14} />
            {p.sqft.toLocaleString()} ft²
          </span>
        </div>

        <div className="card-meta">
          {isSold ? (
            <>
              <span className="card-meta-left">
                <Icon name="user" size={13} />
                {p.buyer}
              </span>
              <span>{p.soldDate}</span>
            </>
          ) : isRent ? (
            <>
              <span className="card-meta-left">
                <Icon name="calendar" size={13} />
                {p.leaseTerm}
              </span>
              <span>{p.listed}</span>
            </>
          ) : (
            <>
              <span className="card-meta-left">
                <Icon name="eye" size={13} />
                {p.views} views
              </span>
              <span>{p.listed}</span>
            </>
          )}
        </div>

        {/* Inquiry bar */}
        {!isSold && p.inquiries && (
          <div className="card-inquiry">
            <div className="card-inquiry-header">
              <span>{p.inquiries} inquiries</span>
              <span>{p.views} views</span>
            </div>
            <div className="card-inquiry-track">
              <div
                className="card-inquiry-fill"
                style={{
                  width: `${Math.min((p.inquiries / 20) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TAB BUTTON
   ══════════════════════════════════════ */
function Tab({ active, onClick, icon, label, count }) {
  return (
    <button
      className={`tab-btn ${active ? "tab-active" : ""}`}
      onClick={onClick}
    >
      <Icon name={icon} size={16} />
      {label}
      <span className="tab-count">{count}</span>
    </button>
  );
}

/* ══════════════════════════════════════
   SELLER PAGE
   ══════════════════════════════════════ */
export default function SellerPage() {
  const [tab, setTab] = useState("sold");
  const [search, setSearch] = useState("");
  const { show, ToastEl } = useToast();

  const tabs = [
    { key: "sold", icon: "badge-check", label: "Sold", count: soldProperties.length },
    { key: "sale", icon: "tag", label: "For Sale", count: forSaleProperties.length },
    { key: "rent", icon: "key", label: "For Rent", count: forRentProperties.length },
  ];

  const dataSource = { sold: soldProperties, sale: forSaleProperties, rent: forRentProperties };

  const filtered = useMemo(() => {
    const src = dataSource[tab];
    if (!search.trim()) return src;
    const q = search.toLowerCase();
    return src.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }, [tab, search]);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    show("Copied to clipboard!");
  };

  const saleValue = forSaleProperties.reduce((s, p) => s + p.price, 0);

  return (
    <div className="sellerhub-wrapper">
      {ToastEl}

      {/* ── Header Component (ADDED) ── */}
      <Header />

      {/* ── Existing Nav (KEPT) ── */}
      <nav >
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <Icon name="layout-dashboard" size={18} />
            </div>
            <span className="nav-logo-text">Seller Workspace</span>
          </div>

          <div className="nav-search">
            <Icon name="search" size={16} className="nav-search-icon" />
            <input
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="nav-right">
            <button className="nav-notif">
              {/* --- SIMPLE EMOJI ICON --- */}
              <span style={{ fontSize: '18px' }}>🔔</span>
              <span className="nav-notif-badge">3</span>
            </button>
            <div className="nav-avatar">
              <img src={seller.avatar} alt="" />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <div className="app-layout">
       
        <div className="main-grid">
          {/* Sidebar */}
          <aside className="sidebar">
            <SellerProfile onCopy={handleCopy} />
            <StatCard icon="home" label="Total Sold" value={soldProperties.length} color="green" delay="d1" />
            <StatCard icon="tag" label="For Sale" value={forSaleProperties.length} color="blue" delay="d2" />
            <StatCard icon="key" label="For Rent" value={forRentProperties.length} color="amber" delay="d3" />
            <StatCard icon="dollar-sign" label="Portfolio Value" value={fmt(saleValue)} color="red" delay="d4" />
          </aside>

          {/* Main column */}
          <section className="main-content">
            <div className="page-heading anim-fade-up">
              <h1>
                Property <span className="page-heading-accent">Dashboard</span>
              </h1>
              <p className="page-heading-sub">
                Overview of your sold, active sale, and rental listings
              </p>
            </div>

            <div className="tabs-row anim-fade-up d1">
              {tabs.map((t) => (
                <Tab
                  key={t.key}
                  active={tab === t.key}
                  onClick={() => setTab(t.key)}
                  {...t}
                />
              ))}
            </div>

            {tab === "sold" && <SoldSummary />}

            {filtered.length > 0 ? (
              <div className="property-grid" key={tab}>
                {filtered.map((p) => (
                  <PropertyCard key={p.id} p={p} mode={tab} />
                ))}
              </div>
            ) : (
              <div className="empty-state glass">
                <Icon name="search-x" size={48} className="empty-icon" />
                <p className="empty-text">No properties match your search</p>
                <button className="empty-clear" onClick={() => setSearch("")}>
                  Clear search
                </button>
              </div>
            )}

            
          </section>
        </div>
        
       
      </div>
       <FloatingButton />
        <Footer />
    </div>
  );
}