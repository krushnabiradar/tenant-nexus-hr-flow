
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/user');
    return response.data;
  },
};

// Tenant Service
export const tenantService = {
  getAllTenants: async () => {
    const response = await api.get('/tenants');
    return response.data;
  },
  
  getTenantById: async (id: string) => {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  },
  
  createTenant: async (tenantData: any) => {
    const response = await api.post('/tenants', tenantData);
    return response.data;
  },
  
  updateTenant: async (id: string, updateData: any) => {
    const response = await api.put(`/tenants/${id}`, updateData);
    return response.data;
  },
};

// Employee Service
export const employeeService = {
  getAllEmployees: async (filters = {}) => {
    const response = await api.get('/employees', { params: filters });
    return response.data;
  },
  
  getEmployeeById: async (id: string) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },
  
  createEmployee: async (employeeData: any) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },
  
  updateEmployee: async (id: string, updateData: any) => {
    const response = await api.put(`/employees/${id}`, updateData);
    return response.data;
  },
};

// Payroll Service
export const payrollService = {
  getPayrollHistory: async (employeeId: string) => {
    const response = await api.get(`/payroll/employee/${employeeId}`);
    return response.data;
  },
  
  generatePayroll: async (payrollData: any) => {
    const response = await api.post('/payroll/generate', payrollData);
    return response.data;
  },
  
  getPayrollById: async (id: string) => {
    const response = await api.get(`/payroll/${id}`);
    return response.data;
  },
};

// Attendance Service
export const attendanceService = {
  getEmployeeAttendance: async (employeeId: string, month: string) => {
    const response = await api.get(`/attendance/employee/${employeeId}`, {
      params: { month }
    });
    return response.data;
  },
  
  markAttendance: async (attendanceData: any) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  },
};

// Leave Service
export const leaveService = {
  getEmployeeLeaves: async (employeeId: string) => {
    const response = await api.get(`/leave/employee/${employeeId}`);
    return response.data;
  },
  
  applyLeave: async (leaveData: any) => {
    const response = await api.post('/leave/apply', leaveData);
    return response.data;
  },
  
  approveLeave: async (leaveId: string, decision: { status: string }) => {
    const response = await api.put(`/leave/${leaveId}/approve`, decision);
    return response.data;
  },
};

export default api;
