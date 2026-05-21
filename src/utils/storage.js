const STORAGE_KEY = 'applytrack_applications';

/**
 * Load applications from localStorage
 * Returns empty array if data is corrupted or missing
 */
export function loadApplications() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Validate that we got an array
    if (!Array.isArray(parsed)) {
      console.warn('Corrupted localStorage data, resetting to empty');
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.warn('Error loading applications from localStorage:', error);
    return [];
  }
}

/**
 * Save applications to localStorage
 */
export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  } catch (error) {
    console.error('Error saving applications to localStorage:', error);
    alert('Failed to save data. Your browser storage may be full.');
  }
}

/**
 * Validate application object has required fields
 */
export function validateApplication(app) {
  const errors = [];
  
  if (!app.company || app.company.trim() === '') {
    errors.push('Company name is required');
  }
  
  if (!app.role || app.role.trim() === '') {
    errors.push('Role is required');
  }
  
  if (!app.status) {
    errors.push('Status is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Create a new application with defaults
 */
export function createApplication(data) {
  return {
    id: Date.now().toString(),
    company: data.company?.trim() || '',
    role: data.role?.trim() || '',
    status: data.status || 'applied',
    deadline: data.deadline || '',
    link: data.link?.trim() || '',
    notes: data.notes?.trim() || '',
    createdAt: new Date().toISOString()
  };
}
