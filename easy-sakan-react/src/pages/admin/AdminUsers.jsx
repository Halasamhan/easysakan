import { useState, useEffect } from 'react';
import '../../styles/admin.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/admin_users_handler.php?filter=${filter}`);
      const data = await response.json();
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch('/api/admin_users_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_status',
          id,
          status: currentStatus === 'active' ? 'inactive' : 'active'
        })
      });
      const data = await response.json();
      if (data.success) {
        fetchUsers();
        alert('User status updated successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to update status'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    try {
      const response = await fetch('/api/admin_users_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await response.json();
      if (data.success) {
        fetchUsers();
        alert('User deleted successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to delete user'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const getStatusColor = (status) => status === 'active' ? '#4CAF50' : '#F44336';

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Easy Sakan</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          <a href="/admin/dashboard" className="nav-item">📊 Dashboard</a>
          <a href="/admin/posters" className="nav-item">🖼️ Posters</a>
          <a href="/admin/services" className="nav-item">🔧 Services</a>
          <a href="/admin/bookings" className="nav-item">📅 Bookings</a>
          <a href="/admin/listings" className="nav-item">🏠 Listings</a>
          <a href="/admin/users" className="nav-item active">👥 Users</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Manage Users</h1>
        </header>

        <div className="filter-section">
          <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All Users</button>
          <button onClick={() => setFilter('customers')} className={`filter-btn ${filter === 'customers' ? 'active' : ''}`}>Customers</button>
          <button onClick={() => setFilter('sellers')} className={`filter-btn ${filter === 'sellers' ? 'active' : ''}`}>Sellers</button>
          <button onClick={() => setFilter('active')} className={`filter-btn ${filter === 'active' ? 'active' : ''}`}>Active</button>
        </div>

        {loading ? (
          <div className="loading-state">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty-state"><p>No users found</p></div>
        ) : (
          <div className="items-table">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Type</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="user-type-badge">
                        {user.user_type === 'seller' ? '🏢 Seller' : '👤 Customer'}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(user.status) }}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleToggleStatus(user.id, user.status)} className={`btn-sm ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}>
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
