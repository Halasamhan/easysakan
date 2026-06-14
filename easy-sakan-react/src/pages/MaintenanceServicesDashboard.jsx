import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/maintenance-services.css';
import {
  technicians,
  jobs,
  messages,
  analyticsData,
  serviceCategories,
  calculateStats,
  getStatusColor,
  getTechnicianStatusColor,
} from '../data/maintenanceServicesData';
import {
  translations,
  getStatusLabel,
  getTechnicianStatusLabel,
} from '../data/MaintenanceDashboard';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card" style={{ borderLeftColor: color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);

const JobsTable = ({ jobsList, onAssign, onCall, t, lang }) => {
  const [filteredJobs,  setFilteredJobs]  = useState(jobsList);
  const [filterStatus,  setFilterStatus]  = useState('all');
  const [filterService, setFilterService] = useState('all');

  useEffect(() => {
    let filtered = jobsList;
    if (filterStatus !== 'all')  filtered = filtered.filter(j => j.status === filterStatus);
    if (filterService !== 'all') filtered = filtered.filter(j => j.serviceType === filterService);
    setFilteredJobs(filtered);
  }, [filterStatus, filterService, jobsList]);

  return (
    <div className="jobs-section">
      <div className="section-header">
        <h2>{t.jobs_header}</h2>
        <div className="filter-group">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-select">
            <option value="all">{t.filter_all}</option>
            <option value="pending">{t.filter_pending}</option>
            <option value="assigned">{t.filter_assigned}</option>
            <option value="in-progress">{t.filter_progress}</option>
            <option value="completed">{t.filter_completed}</option>
          </select>
          <select value={filterService} onChange={e => setFilterService(e.target.value)} className="filter-select">
            <option value="all">{t.filter_all_srv}</option>
            {serviceCategories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="jobs-table-wrapper">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>{t.th_id}</th>
              <th>{t.th_customer}</th>
              <th>{t.th_service}</th>
              <th>{t.th_location}</th>
              <th>{t.th_datetime}</th>
              <th>{t.th_status}</th>
              <th>{t.th_tech}</th>
              <th>{t.th_actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr key={job.id} className="job-row">
                <td className="job-id">{job.id}</td>
                <td>{job.customerName}</td>
                <td>{serviceCategories.find(c => c.name === job.serviceType)?.icon} {job.serviceType}</td>
                <td>{job.location}</td>
                <td>{job.dateTime}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(job.status) }}>
                    {getStatusLabel(job.status, lang)}
                  </span>
                </td>
                <td>
                  {job.assignedTechnician
                    ? technicians.find(t2 => t2.id === job.assignedTechnician)?.name
                    : t.no_tech}
                </td>
                <td className="actions-cell">
                  {job.status === 'pending' && (
                    <button className="btn-assign" onClick={() => onAssign(job)}>{t.btn_assign}</button>
                  )}
                  <button className="btn-call" onClick={() => onCall(job)}>{t.btn_call}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TechnicianCard = ({ tech, t, lang }) => (
  <div className="tech-card">
    <div className="tech-header">
      <span className="tech-photo">{tech.photo}</span>
      <div className="tech-status" style={{ backgroundColor: getTechnicianStatusColor(tech.status) }} />
    </div>
    <div className="tech-info">
      <h3>{tech.name}</h3>
      <p className="tech-specialty">{tech.specialty}</p>
      <p className="tech-status-text">{getTechnicianStatusLabel(tech.status, lang)}</p>
      <div className="tech-rating">⭐ {tech.rating} ({tech.completedJobs} {t.jobs_unit})</div>
    </div>
    <button className="btn-assign-tech" onClick={() => alert(`Assigning job to ${tech.name}`)}>
      {t.btn_assign_job}
    </button>
  </div>
);

const TechnicianMap = ({ techList, t, lang }) => (
  <div className="map-section">
    <div className="section-header"><h2>{t.tech_header}</h2></div>
    <div className="tech-cards-grid">
      {techList.map(tech => (
        <TechnicianCard key={tech.id} tech={tech} t={t} lang={lang} />
      ))}
    </div>
  </div>
);

const MessagesPanel = ({ messagesList, t }) => {
  const [expandedJob, setExpandedJob] = useState(null);

  const jobMessages = messagesList.reduce((acc, msg) => {
    if (!acc[msg.jobId]) acc[msg.jobId] = [];
    acc[msg.jobId].push(msg);
    return acc;
  }, {});

  return (
    <div className="messages-section">
      <div className="section-header"><h2>{t.msg_header}</h2></div>
      <div className="messages-list">
        {Object.entries(jobMessages).map(([jobId, msgs]) => (
          <div key={jobId} className="job-messages">
            <div
              className="job-message-header"
              onClick={() => setExpandedJob(expandedJob === jobId ? null : jobId)}
            >
              <span>{jobId}</span>
              <span className="unread-badge">{msgs.filter(m => !m.read).length}</span>
              <span className="expand-icon">{expandedJob === jobId ? '▼' : '▶'}</span>
            </div>
            {expandedJob === jobId && (
              <div className="messages-content">
                {msgs.map(msg => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    <div className="message-sender">{msg.sender}</div>
                    <div className="message-text">{msg.content}</div>
                    <div className="message-time">{msg.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsSection = ({ data, t }) => (
  <div className="analytics-section">
    <div className="section-header"><h2>{t.analytics_header}</h2></div>
    <div className="analytics-grid">
      <div className="analytics-card">
        <div className="analytics-label">{t.analytics_completed}</div>
        <div className="analytics-value">{data.today.jobsCompleted}</div>
      </div>
      <div className="analytics-card">
        <div className="analytics-label">{t.analytics_response}</div>
        <div className="analytics-value">{data.today.avgResponseTime}</div>
      </div>
      <div className="analytics-card">
        <div className="analytics-label">{t.analytics_revenue}</div>
        <div className="analytics-value">{t.currency} {data.today.todaysRevenue}</div>
      </div>
      <div className="analytics-card">
        <div className="analytics-label">{t.analytics_satisfaction}</div>
        <div className="analytics-value">⭐ {data.today.satisfaction}</div>
      </div>
    </div>
  </div>
);

const NotificationsPanel = ({ unreadCount, t }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="notifications-panel">
      <button className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
        🔔
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>
      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notification-item">
            <span>{t.notif_new} محمد العربي</span>
            <span className="time">{t.time_10min}</span>
          </div>
          <div className="notification-item">
            <span>⏰ Fatima Al-Zahra {t.notif_delayed}</span>
            <span className="time">{t.time_5min}</span>
          </div>
          <div className="notification-item">
            <span>✅ JOB-004 {t.notif_completed}</span>
            <span className="time">{t.time_2hr}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function MaintenanceServicesDashboard() {
  const { user }    = useAuth();
  const { lang }    = useLanguage();
  const t           = translations[lang];

  const [stats, setStats]                     = useState(calculateStats());
  const [unreadMessages]                       = useState(messages.filter(m => !m.read).length);
  const [showNewRequestForm, setShowNewReq]   = useState(false);

  useEffect(() => {
    const iv = setInterval(() => setStats(calculateStats()), 60000);
    return () => clearInterval(iv);
  }, []);

  const handleAssignJob    = (job) => alert(`Opening assignment dialog for ${job.id}`);
  const handleCallCustomer = (job) => alert(`Calling ${job.customerName} at ${job.phone}`);

  return (
    <div className="maintenance-dashboard" dir={t.direction}>
      <div className="dashboard-container">

        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <a href="#dashboard" className="nav-item active">{t.nav_dashboard}</a>
            <a href="#jobs"        className="nav-item">{t.nav_jobs}</a>
            <a href="#technicians" className="nav-item">{t.nav_technicians}</a>
            <a href="#messages"    className="nav-item">{t.nav_messages}</a>
            <a href="#analytics"   className="nav-item">{t.nav_analytics}</a>
            <a href="#settings"    className="nav-item">{t.nav_settings}</a>
          </nav>
        </aside>

        {/* Main */}
        <main className="dashboard-main">
          <div className="dashboard-top-bar">
            <h1>{t.title}</h1>
            <div className="top-bar-actions">
              <NotificationsPanel unreadCount={unreadMessages} t={t} />
              <button className="btn-primary" onClick={() => setShowNewReq(!showNewRequestForm)}>
                {t.btn_new_request}
              </button>
            </div>
          </div>

          {/* New request form */}
          {showNewRequestForm && (
            <div className="new-request-form">
              <h2>{t.form_title}</h2>
              <div className="form-grid">
                <input type="text"          placeholder={t.ph_customer_name} className="form-input" />
                <input type="email"         placeholder={t.ph_email}         className="form-input" />
                <input type="tel"           placeholder={t.ph_phone}         className="form-input" />
                <select className="form-input">
                  <option>{t.ph_service_type}</option>
                  {serviceCategories.map(cat => (
                    <option key={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <input type="text"          placeholder={t.ph_location}      className="form-input" />
                <input type="datetime-local"                                  className="form-input" />
                <textarea placeholder={t.ph_description} className="form-textarea" rows="3" />
                <select className="form-input">
                  <option>{t.ph_technician}</option>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name} - {tech.specialty}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button className="btn-success"                                 >{t.btn_create}</button>
                <button className="btn-cancel" onClick={() => setShowNewReq(false)}>{t.btn_cancel}</button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="stats-grid">
            <StatCard icon="🛠️" label={t.stat_jobs_today}   value={stats.jobsToday}          color="#3b82f6" />
            <StatCard icon="⏳" label={t.stat_pending}       value={stats.pendingRequests}     color="#f59e0b" />
            <StatCard icon="👨‍🔧" label={t.stat_active_tech} value={stats.activeTechnicians}   color="#22c55e" />
            <StatCard icon="💰" label={t.stat_revenue}       value={`${t.currency} ${stats.todaysRevenue}`} color="#8b5cf6" />
          </div>

          <JobsTable
            jobsList={jobs}
            onAssign={handleAssignJob}
            onCall={handleCallCustomer}
            t={t}
            lang={lang}
          />

          <div className="dashboard-two-column">
            <TechnicianMap techList={technicians} t={t} lang={lang} />
            <MessagesPanel messagesList={messages} t={t} />
          </div>

          <AnalyticsSection data={analyticsData} t={t} />
        </main>
      </div>
    </div>
  );
}
