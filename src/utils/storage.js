const STORAGE_KEY = 'applytrack_applications';

export function getApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('localStorage data is invalid, returning empty list');
      return [];
    }

    return parsed;
  } catch (error) {
    console.warn('Failed to parse localStorage applications:', error);
    return [];
  }
}

export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Failed to save applications to localStorage:', error);
    alert('Unable to save changes. Please check browser storage settings.');
  }
}

export function validateApplication(app) {
  const errors = [];
  if (!app.company || app.company.trim() === '') {
    errors.push('Company is required.');
  }
  if (!app.role || app.role.trim() === '') {
    errors.push('Role is required.');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function createApplication(data) {
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    company: data.company?.trim() || '',
    role: data.role?.trim() || '',
    status: data.status || 'applied',
    deadline: data.deadline || '',
    link: data.link?.trim() || '',
    notes: data.notes?.trim() || '',
    createdAt: new Date().toISOString()
  };
}
