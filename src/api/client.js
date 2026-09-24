/**
 * src/api/client.js
 * Thin fetch wrapper that connects the React frontend to the Flask backend.
 * Base URL is read from the Vite environment variable VITE_API_URL.
 * Defaults to http://localhost:5000 for local development.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Core fetch wrapper with JSON handling, CORS credentials, and error normalization.
 * @param {string} endpoint - API path e.g. '/api/programs'
 * @param {RequestInit} options - fetch options
 * @returns {Promise<{success, data, message, errors?}>}
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: 'include',           // Send session cookies (Flask session auth)
    headers: { 'Content-Type': 'application/json' },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: { ...defaultOptions.headers, ...(options.headers || {}) },
  };

  const response = await fetch(url, mergedOptions);
  const json = await response.json();

  if (!response.ok) {
    // Attach HTTP status to the error object for callers to check
    const err = new Error(json.message || 'API request failed');
    err.status = response.status;
    err.errors = json.errors || null;
    throw err;
  }

  return json;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export const authApi = {
  login: (email, password) =>
    apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  logout: () =>
    apiFetch('/api/auth/logout', { method: 'POST' }),

  status: () =>
    apiFetch('/api/auth/status'),
};

// ---------------------------------------------------------------------------
// Programs
// ---------------------------------------------------------------------------
export const programsApi = {
  getAll: () => apiFetch('/api/programs'),

  add: (data) =>
    apiFetch('/api/programs', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    apiFetch(`/api/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id) =>
    apiFetch(`/api/programs/${id}`, { method: 'DELETE' }),
};

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export const projectsApi = {
  getAll: () => apiFetch('/api/projects'),

  add: (data) =>
    apiFetch('/api/projects', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    apiFetch(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id) =>
    apiFetch(`/api/projects/${id}`, { method: 'DELETE' }),
};

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export const testimonialsApi = {
  getAll: () => apiFetch('/api/testimonials'),

  add: (data) =>
    apiFetch('/api/testimonials', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    apiFetch(`/api/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id) =>
    apiFetch(`/api/testimonials/${id}`, { method: 'DELETE' }),
};

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------
export const settingsApi = {
  get: () => apiFetch('/api/settings'),

  update: (data) =>
    apiFetch('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),

  resetToDefaults: () =>
    apiFetch('/api/settings/reset', { method: 'POST' }),
};

// ---------------------------------------------------------------------------
// Public Forms
// ---------------------------------------------------------------------------
export const formsApi = {
  submitContact: (data) =>
    apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(data) }),

  submitVolunteer: (data) =>
    apiFetch('/api/volunteer', { method: 'POST', body: JSON.stringify(data) }),

  submitDonation: (data) =>
    apiFetch('/api/donate', { method: 'POST', body: JSON.stringify(data) }),
};

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export const adminApi = {
  getDashboard: () => apiFetch('/api/admin/dashboard'),

  getMessages: () => apiFetch('/api/admin/messages'),
  markMessageRead: (id) =>
    apiFetch(`/api/admin/messages/${id}/read`, { method: 'PATCH' }),
  deleteMessage: (id) =>
    apiFetch(`/api/admin/messages/${id}`, { method: 'DELETE' }),

  getVolunteers: () => apiFetch('/api/admin/volunteers'),
  updateVolunteerStatus: (id, status) =>
    apiFetch(`/api/admin/volunteers/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteVolunteer: (id) =>
    apiFetch(`/api/admin/volunteers/${id}`, { method: 'DELETE' }),

  getDonations: () => apiFetch('/api/admin/donations'),
};
