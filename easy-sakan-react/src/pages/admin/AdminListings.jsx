import { useState, useEffect } from 'react';
import '../../styles/admin.css';

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchListings();
  }, [filter]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`/api/admin_listings_handler.php?filter=${filter}`);
      const data = await response.json();
      if (data.success) {
        setListings(data.listings || []);
      }
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch('/api/admin_listings_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', id })
      });
      const data = await response.json();
      if (data.success) {
        fetchListings();
        alert('Listing approved successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to approve listing'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;
    try {
      const response = await fetch('/api/admin_listings_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', id, reason })
      });
      const data = await response.json();
      if (data.success) {
        fetchListings();
        alert('Listing rejected successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to reject listing'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      const response = await fetch('/api/admin_listings_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await response.json();
      if (data.success) {
        fetchListings();
        alert('Listing deleted successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to delete listing'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
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
          <a href="/admin/bookings" className="nav-item">📅 Bookings</a>
          <a href="/admin/listings" className="nav-item active">🏠 Listings</a>
          <a href="/admin/users" className="nav-item">👥 Users</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Manage Listings</h1>
        </header>

        <div className="filter-section">
          <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All Listings</button>
          <button onClick={() => setFilter('pending')} className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}>Pending</button>
          <button onClick={() => setFilter('approved')} className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}>Approved</button>
          <button onClick={() => setFilter('rejected')} className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}>Rejected</button>
        </div>

        {loading ? (
          <div className="loading-state">Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="empty-state"><p>No listings found</p></div>
        ) : (
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th><th>Seller</th><th>Type</th><th>Price</th><th>Space</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(units=> (
                  <tr key={units.unitID}>
                    <td>{units.name}</td>
                    <td>{units.seller_name}</td>
                    <td>{units.type}</td>
                    <td>EGP {units.price}</td>
                    <td>{units.space} m²</td>
                    <td>
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(units.stat) }}>
                        {units.stat}
                      </span>
                    </td>
                    <td>
                      {units.stat === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(units.unitID)} className="btn-success btn-sm">Approve</button>
                          <button onClick={() => handleReject(units.unitID)} className="btn-danger btn-sm">Reject</button>
                        </>
                      )}
                      {units.status !== 'pending' && (
                        <button onClick={() => handleDelete(unitID)} className="btn-danger btn-sm">Delete</button>
                      )}
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
