import { useState, useEffect } from 'react';
import '../../styles/admin.css';

export default function AdminPosters() {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: 'services',
    image: null
  });
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      const response = await fetch('/api/admin_posters_handler.php?action=list');
      const data = await response.json();
      if (data.success) {
        setPosters(data.posters || []);
      }
    } catch (err) {
      console.error('Failed to fetch posters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('action', 'create');
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('location', formData.location);
    if (formData.image) form.append('image', formData.image);

    try {
      const response = await fetch('/api/admin_posters_handler.php', {
        method: 'POST',
        body: form
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ title: '', description: '', location: 'services', image: null });
        setPreview(null);
        setShowForm(false);
        fetchPosters();
        alert('Poster created successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to create poster'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this poster?')) return;
    try {
      const response = await fetch('/api/admin_posters_handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await response.json();
      if (data.success) {
        fetchPosters();
        alert('Poster deleted successfully!');
      } else {
        alert('Error: ' + (data.message || 'Failed to delete poster'));
      }
    } catch (err) {
      alert('Connection error: ' + err.message);
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
          <a href="/admin/posters" className="nav-item active">🖼️ Posters</a>
          <a href="/admin/services" className="nav-item">🔧 Services</a>
          <a href="/admin/bookings" className="nav-item">📅 Bookings</a>
          <a href="/admin/listings" className="nav-item">🏠 Listings</a>
          <a href="/admin/users" className="nav-item">👥 Users</a>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Manage Posters</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? 'Cancel' : '+ Add New Poster'}
          </button>
        </header>

        {showForm && (
          <div className="admin-form-section">
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Poster title" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Poster description" className="form-textarea" rows="4" />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <select name="location" value={formData.location} onChange={handleChange} className="form-input">
                  <option value="services">Services Page</option>
                  <option value="home">Home Page</option>
                  <option value="listings">Listings Page</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Upload Image</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="form-input" />
                {preview && <div className="image-preview"><img src={preview} alt="Preview" /></div>}
              </div>
              <button type="submit" className="btn-primary">Create Poster</button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading posters...</div>
        ) : posters.length === 0 ? (
          <div className="empty-state">
            <p>No posters yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">Create your first poster</button>
          </div>
        ) : (
          <div className="items-table">
            <table>
              <thead>
                <tr><th>Title</th><th>Location</th><th>Created</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {posters.map(poster => (
                  <tr key={poster.id}>
                    <td>{poster.title}</td>
                    <td>{poster.location}</td>
                    <td>{new Date(poster.created_at).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleDelete(poster.id)} className="btn-danger btn-sm">Delete</button>
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
