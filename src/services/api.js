import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create public axios instance (no auth token)
const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Create admin axios instance (with auth token)
const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token for admin routes only
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors for admin API
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => publicApi.post('/admin/login', credentials),
  superLogin: (credentials) => publicApi.post('/admin/super-login', credentials),
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('adminUser');
    if (!user) return null;
    
    try {
      const parsedUser = JSON.parse(user);
      // SECURITY: Remove password field completely
      const { password, ...userWithoutPassword } = parsedUser;
      
      // SECURITY: If name contains password-like patterns, clean it
      if (userWithoutPassword.name && (
        userWithoutPassword.name.includes('@') || 
        userWithoutPassword.name.includes('2025')
      )) {
        // Use email username part if available
        if (userWithoutPassword.email) {
          userWithoutPassword.name = userWithoutPassword.email.split('@')[0];
        } else {
          userWithoutPassword.name = 'Admin';
        }
        
        // Update localStorage with cleaned data
        localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
      }
      
      return userWithoutPassword;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },
  setToken: (token) => localStorage.setItem('adminToken', token),
  setUser: (user) => {
    // Remove password field if it exists (security: never store password)
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('adminUser', JSON.stringify(userWithoutPassword));
  },
};


// News API
export const newsAPI = {
  // Public routes (no auth required)
  getAll: (params = {}) => publicApi.get('/news', { params }),
  getById: (id) => publicApi.get(`/news/${id}`),
  getByType: (type, params = {}) => publicApi.get(`/news/type/${type}`, { params }),
  
  // Admin routes (auth required)
  create: (data) => {
    return adminApi.post('/news/add', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data) => {
    return adminApi.put(`/news/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => adminApi.delete(`/news/${id}`),
  togglePublish: (id) => adminApi.patch(`/news/${id}/toggle-publish`),
};

// Events API
export const eventAPI = {
  // Public routes (no auth required)
  getAll: (params = {}) => publicApi.get('/events', { params }),
  getById: (id) => publicApi.get(`/events/${id}`),
  getByType: (type, params = {}) => publicApi.get(`/events/type/${type}`, { params }),
  
  // Admin routes (auth required)
  create: (data) => {
    return adminApi.post('/events/add', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data) => {
    return adminApi.put(`/events/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => adminApi.delete(`/events/${id}`),
  togglePublish: (id) => adminApi.patch(`/events/${id}/toggle-publish`),
};

// Admin API
export const adminAPI = {
  getAll: () => adminApi.get('/admin/all'),
  getById: (id) => adminApi.get(`/admin/single/${id}`),
  create: (data) => adminApi.post('/admin/create', data),
  update: (id, data) => adminApi.put(`/admin/${id}`, data),
  delete: (id) => adminApi.delete(`/admin/${id}`),
};

// Booking API
export const bookingAPI = {
  create: (data) => publicApi.post('/bookings/create', data),
  getAll: (params = {}) => adminApi.get('/bookings', { params }),
  getByEvent: (eventId, params = {}) => adminApi.get(`/bookings/event/${eventId}`, { params }),
  updateStatus: (id, status) => adminApi.patch(`/bookings/${id}/status`, { status }),
  delete: (id) => adminApi.delete(`/bookings/${id}`),
  getStats: () => adminApi.get('/bookings/stats'),
};

export default publicApi;
