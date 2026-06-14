import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalListings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingListings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) setAdminUser(JSON.parse(user));
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin_dashboard_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const menuItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { title: 'Posters', path: '/admin/posters', icon: '🖼️' },
    { title: 'Services', path: '/admin/services', icon: '🔧' },
    { title: 'Bookings', path: '/admin/bookings', icon: '📅' },
    { title: 'Listings', path: '/admin/listings', icon: '🏠' },
    { title: 'Users', path: '/admin/users', icon: '👥' }
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Easy Sakan</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <Link key={item.path} to={item.path} className="nav-item">
              <span className="nav-icon">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-user-info">
            <p className="user-name">{adminUser?.name || 'Administrator'}</p>
            <p className="user-email">{adminUser?.email}</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your platform.</p>
        </header>

        {loading ? (
          <div className="loading-state">Loading dashboard...</div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#4DAAFF' }}>📅</div>
                <div className="stat-content">
                  <h3>Total Bookings</h3>
                  <p className="stat-value">{stats.totalBookings}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#CCFFA5' }}>🏠</div>
                <div className="stat-content">
                  <h3>Total Listings</h3>
                  <p className="stat-value">{stats.totalListings}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#FFB347' }}>👥</div>
                <div className="stat-content">
                  <h3>Total Users</h3>
                  <p className="stat-value">{stats.totalUsers}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: '#FF6B6B' }}>💰</div>
                <div className="stat-content">
                  <h3>Revenue</h3>
                  <p className="stat-value">EGP {stats.totalRevenue}</p>
                </div>
              </div>
              {stats.pendingListings > 0 && (
                <div className="stat-card alert">
                  <div className="stat-icon">⚠️</div>
                  <div className="stat-content">
                    <h3>Pending Listings</h3>
                    <p className="stat-value">{stats.pendingListings}</p>
                  </div>
                </div>
              )}
            </div>

            <section className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-grid">
                <Link to="/admin/posters" className="action-btn"><span>📸</span><p>Add Poster</p></Link>
                <Link to="/admin/services" className="action-btn"><span>➕</span><p>Add Service</p></Link>
                <Link to="/admin/bookings" className="action-btn"><span>📋</span><p>View Bookings</p></Link>
                <Link to="/admin/listings" className="action-btn"><span>✓</span><p>Review Listings</p></Link>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
