import { useState, useEffect } from 'react';
import { loadApplications, saveApplications, validateApplication, createApplication } from './utils/storage';
import './App.css';

export default function App() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'applied',
    deadline: '',
    link: '',
    notes: ''
  });

  useEffect(() => {
    const loaded = loadApplications();
    setApplications(loaded);
  }, []);

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      status: 'applied',
      deadline: '',
      link: '',
      notes: ''
    });
    setEditingId(null);
    setErrors([]);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateApplication(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingId) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingId ? { ...app, ...formData, updatedAt: new Date().toISOString() } : app
        )
      );
    } else {
      const newApp = createApplication(formData);
      setApplications((prev) => [newApp, ...prev]);
    }

    resetForm();
  };

  const startEdit = (app) => {
    setFormData({
      company: app.company,
      role: app.role,
      status: app.status,
      deadline: app.deadline,
      link: app.link,
      notes: app.notes
    });
    setEditingId(app.id);
    setShowForm(true);
    setErrors([]);
  };

  const deleteApplication = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>?? ApplyTrack</h1>
        <p>Track your job and internship applications</p>
      </header>

      <main className="app-main">
        <button className="btn btn-primary btn-add" onClick={() => setShowForm(true)}>
          + Add Application
        </button>

        {showForm && (
          <section className="form-section">
            <h2>{editingId ? 'Edit Application' : 'Add New Application'}</h2>
            {errors.length > 0 && (
              <div className="error-box">
                {errors.map((error, index) => (
                  <p key={index}>?? {error}</p>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company *</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="link">Application Link</label>
                <input id="link" name="link" type="url" value={formData.link} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows="3" />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Application' : 'Add Application'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="applications-section">
          {applications.length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">No applications yet</p>
              <p className="empty-subtitle">Add your first application to begin tracking.</p>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map((app) => (
                <div key={app.id} className={pplication-card status-}>
                  <div className="card-header">
                    <div>
                      <h3>{app.company}</h3>
                      <p className="role">{app.role}</p>
                    </div>
                    <span className={status-badge status-}>{app.status}</span>
                  </div>
                  <div className="card-body">
                    {app.deadline && <p className="meta">?? Deadline: {new Date(app.deadline).toLocaleDateString()}</p>}
                    {app.notes && <p className="notes">?? {app.notes}</p>}
                    <p className="created-at">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => startEdit(app)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteApplication(app.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
