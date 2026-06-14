import { useState, useEffect } from 'react';
import '../../styles/admin.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '🔧', price: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin_services_handler.php?action=list');
      const data = await response.json();
      if (data.success) {
        setServices(data.services || []);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'update' : 'create';
    try {
      const body = { action: method, ...formData };
      if (editingId) body.id = editingId;
      const response = await fetch('/api/admin_services_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ title: '', description: '', icon: '🔧', price: '' });
        setEditingId(null);
        setShowForm(false);
        fetchServices();
        alert(`Service ${method === 'create' ? 'created' : 'updated'} successfully!`);
      } else {
        alert('Error: ' + (data.message || 'Failed to save service'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const handleEdit = (service) => {
    setFormData({ title: service.title, description: service.description, icon: service.icon, price: service.price });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const response = await fetch('/api/admin_services_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await response.json();
      if (data.success) {
        fetchServices();
        alert('Service deleted successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to delete service'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', icon: '🔧', price: '' });
    setEditingId(null);
    setShowForm(false);
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
          <a href="/admin/services" className="nav-item active">🔧 Services</a>
          <a href="/admin/bookings" className="nav-item">📅 Bookings</a>
          <a href="/admin/listings" className="nav-item">🏠 Listings</a>
          <a href="/admin/users" className="nav-item">👥 Users</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Manage Services</h1>
          <button onClick={() => !showForm && setShowForm(true)} className="btn-primary">
            {showForm ? 'Form Open' : '+ Add New Service'}
          </button>
        </header>

        {showForm && (
          <div className="admin-form-section">
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Service Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Plumbing" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Service description" className="form-textarea" rows="4" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Icon (Emoji)</label>
                  <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="🔧" className="form-input" maxLength="2" />
                </div>
                <div className="form-group">
                  <label className="form-label">Base Price (EGP)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1000" className="form-input" required />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingId ? 'Update Service' : 'Create Service'}</button>
                <button type="button" onClick={handleCancel} className="btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="empty-state">
            <p>No services yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">Create your first service</button>
          </div>
        ) : (
          <div className="items-table">
            <table>
              <thead>
                <tr><th>Icon</th><th>Title</th><th>Description</th><th>Price</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td className="icon-cell">{service.icon}</td>
                    <td>{service.title}</td>
                    <td>{service.description.substring(0, 50)}...</td>
                    <td>EGP {service.price}</td>
                    <td>
                      <button onClick={() => handleEdit(service)} className="btn-info btn-sm">Edit</button>
                      <button onClick={() => handleDelete(service.id)} className="btn-danger btn-sm">Delete</button>
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
