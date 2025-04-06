
import axios from 'axios';

// Create an axios instance with the base URL of your backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in requests
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

// Authentication API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tenant');
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Tenant API calls
export const tenantAPI = {
  getTenant: async (id: string) => {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  },
};

// User API calls
export const userAPI = {
  getUsers: async (tenantId?: string) => {
    const response = await api.get('/users', {
      params: { tenantId }
    });
    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

// Employee API calls
export const employeeAPI = {
  getEmployees: async (tenantId: string) => {
    const response = await api.get('/employees', {
      params: { tenantId }
    });
    return response.data;
  },
  getEmployeeById: async (id: string) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },
};

// Payroll API calls
export const payrollAPI = {
  getPayrolls: async (tenantId: string) => {
    const response = await api.get('/payrolls', {
      params: { tenantId }
    });
    return response.data;
  },
};

// Attendance API calls
export const attendanceAPI = {
  getAttendance: async (employeeId: string) => {
    const response = await api.get('/attendance', {
      params: { employeeId }
    });
    return response.data;
  },
};

// Leave API calls
export const leaveAPI = {
  getLeaveRequests: async (employeeId: string) => {
    const response = await api.get('/leaves', {
      params: { employeeId }
    });
    return response.data;
  },
  submitLeaveRequest: async (leaveData: any) => {
    const response = await api.post('/leaves', leaveData);
    return response.data;
  },
};

export default api;
