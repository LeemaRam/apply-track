import { useState, useEffect } from 'react';
import { getApplications, saveApplications, validateApplication, createApplication } from './utils/storage';
import './App.css';

export default function App() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
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

  // Load applications from localStorage on mount
  useEffect(() => {
    const loaded = getApplications();
    setApplications(loaded);
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  // Reset form
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

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    setErrors([]);
  };

  // Handle form submit (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateApplication(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingId) {
      // Update existing application
      setApplications(prev => prev.map(app => 
        app.id === editingId 
          ? { ...app, ...formData, updatedAt: new Date().toISOString() }
          : app
      ));
    } else {
      // Add new application
      const newApp = createApplication(formData);
      setApplications(prev => [newApp, ...prev]);
    }

    resetForm();
  };

  // Start editing
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

  // Delete application
  const deleteApplication = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  // Filter and search applications
  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      app.company.toLowerCase().includes(searchLower) ||
      app.role.toLowerCase().includes(searchLower) ||
      app.notes.toLowerCase().includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 ApplyTrack</h1>
        <p>Track your job and internship applications</p>
        <p className="app-subtitle">Keep every role, deadline, and status organized in one polished dashboard.</p>
      </header>

      <main className="app-main">
        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.applied}</div>
            <div className="stat-label">Applied</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.interview}</div>
            <div className="stat-label">Interview</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.offer}</div>
            <div className="stat-label">Offer</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </section>

        {/* Add Application Button */}
        {!showForm && (
          <button 
            type="button"
            className="btn btn-primary btn-add"
            onClick={() => setShowForm(true)}
            aria-label="Open add application form"
          >
            + Add Application
          </button>
        )}

        {/* Form Section */}
        {showForm && (
          <section className="form-section">
            <h2>{editingId ? 'Edit Application' : 'Add New Application'}</h2>
            
            {errors.length > 0 && (
              <div className="error-box">
                {errors.map((error, i) => (
                  <p key={i}>⚠️ {error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company *</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Google, Microsoft"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <input
                    id="role"
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Product Manager"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Deadline</label>
                  <input
                    id="deadline"
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="link">Application Link</label>
                <input
                  id="link"
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com/application"
                />
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any notes about this application..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Application' : 'Add Application'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Search and Filter Section */}
        {applications.length > 0 && !showForm && (
          <section className="search-filter-section" aria-label="Search and filter applications">
            <label htmlFor="search" className="sr-only">Search applications</label>
            <input
              id="search"
              type="text"
              placeholder="🔍 Search by company, role, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <label htmlFor="statusFilter" className="sr-only">Filter by status</label>
            <select 
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            {(searchTerm !== '' || filterStatus !== 'all') && (
              <button
                type="button"
                className="btn btn-secondary btn-clear"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                }}
                aria-label="Clear search and status filters"
              >
                Clear filters
              </button>
            )}
          </section>
        )}

        {/* Applications List Section */}
        <section className="applications-section">
          {filteredApplications.length === 0 ? (
            <div className="empty-state">
              {applications.length === 0 ? (
                <>
                  <p className="empty-title">No applications yet</p>
                  <p className="empty-subtitle">Start tracking your applications by clicking "Add Application"</p>
                </>
              ) : (
                <>
                  <p className="empty-title">No matching applications</p>
                  <p className="empty-subtitle">Try adjusting your search or filter</p>
                </>
              )}
            </div>
          ) : (
            <div className="applications-list">
              {filteredApplications.map(app => (
                <div key={app.id} className={`application-card status-${app.status}`}>
                  <div className="card-header">
                    <div>
                      <h3>{app.company}</h3>
                      <p className="role">{app.role}</p>
                    </div>
                    <span className={`status-badge status-${app.status}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="card-body">
                    {app.deadline && (
                      <p className="meta">
                        📅 Deadline: {new Date(app.deadline).toLocaleDateString()}
                      </p>
                    )}
                    {app.link && (
                      <p className="meta">
                        🔗 <a
                          href={app.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open application link for ${app.company}`}
                        >
                          View Application
                        </a>
                      </p>
                    )}
                    {app.notes && (
                      <p className="notes">
                        📝 {app.notes}
                      </p>
                    )}
                    <p className="created-at">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="card-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => startEdit(app)}
                      aria-label={`Edit application for ${app.company}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteApplication(app.id)}
                      aria-label={`Delete application for ${app.company}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>ApplyTrack © 2026 | Your data is saved locally in your browser</p>
      </footer>
    </div>
  );
}
