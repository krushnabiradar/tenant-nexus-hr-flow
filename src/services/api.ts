
import axios from 'axios';

// Create an Axios instance with base URL
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Users API calls
export const usersAPI = {
  getAllUsers: async (params?: { role?: string; tenantId?: string }) => {
    const response = await api.get('/users', { params });
    return response.data;
  },
  
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

// Tenants API calls
export const tenantsAPI = {
  createTenant: async (tenantData: any) => {
    const response = await api.post('/tenants', tenantData);
    return response.data;
  },
  
  getAllTenants: async (params?: { status?: string; plan?: string }) => {
    const response = await api.get('/tenants', { params });
    return response.data;
  },
  
  getTenantById: async (id: string) => {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  },
  
  updateTenant: async (id: string, tenantData: any) => {
    const response = await api.put(`/tenants/${id}`, tenantData);
    return response.data;
  },
  
  deleteTenant: async (id: string) => {
    const response = await api.delete(`/tenants/${id}`);
    return response.data;
  },
  
  getTenantStats: async (id: string) => {
    const response = await api.get(`/tenants/${id}/stats`);
    return response.data;
  },
};

export default api;
