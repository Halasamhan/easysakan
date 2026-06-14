import { useState, useEffect } from 'react';
import '../../styles/admin.css';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/admin_bookings_handler.php?filter=${filter}`);
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/admin_bookings_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        fetchBookings();
        alert('Status updated successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to update status'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'confirmed': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return '#999';
    }
  };

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
          <a href="/admin/bookings" className="nav-item active">📅 Bookings</a>
          <a href="/admin/listings" className="nav-item">🏠 Listings</a>
          <a href="/admin/users" className="nav-item">👥 Users</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Manage Bookings</h1>
        </header>

        <div className="filter-section">
          <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All Bookings</button>
          <button onClick={() => setFilter('pending')} className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}>Pending</button>
          <button onClick={() => setFilter('confirmed')} className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}>Confirmed</button>
          <button onClick={() => setFilter('completed')} className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}>Completed</button>
        </div>

        {loading ? (
          <div className="loading-state">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state"><p>No bookings found</p></div>
        ) : (
          <div className="items-table">
            <table>
              <thead>
                <tr><th>ID</th><th>Customer</th><th>Service</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.customer_name}</td>
                    <td>{booking.service_name}</td>
                    <td>EGP {booking.amount}</td>
                    <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(booking.status) }}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <select value={booking.status} onChange={(e) => handleStatusChange(booking.id, e.target.value)} className="status-select">
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
