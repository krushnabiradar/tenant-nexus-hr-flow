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

// Leaves API calls
export const leavesAPI = {
  getAllLeaves: async (params?: { employeeId?: string; status?: string; tenantId?: string }) => {
    const response = await api.get('/leaves', { params });
    return response.data;
  },
  
  getLeaveById: async (id: string) => {
    const response = await api.get(`/leaves/${id}`);
    return response.data;
  },
  
  createLeave: async (leaveData: any) => {
    const response = await api.post('/leaves', leaveData);
    return response.data;
  },
  
  updateLeave: async (id: string, leaveData: any) => {
    const response = await api.put(`/leaves/${id}`, leaveData);
    return response.data;
  },
  
  deleteLeave: async (id: string) => {
    const response = await api.delete(`/leaves/${id}`);
    return response.data;
  },
  
  getEmployeeLeaveStats: async (employeeId: string) => {
    const response = await api.get(`/leaves/employee/${employeeId}/stats`);
    return response.data;
  },
};

// Attendance API calls
export const attendanceAPI = {
  getAllAttendance: async (params?: { employeeId?: string; date?: string; tenantId?: string }) => {
    const response = await api.get('/attendance', { params });
    return response.data;
  },
  
  getAttendanceById: async (id: string) => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
  },
  
  clockIn: async (data: { employeeId: string; tenantId: string }) => {
    const response = await api.post('/attendance/clock-in', data);
    return response.data;
  },
  
  clockOut: async (data: { employeeId: string }) => {
    const response = await api.post('/attendance/clock-out', data);
    return response.data;
  },
  
  updateAttendance: async (id: string, attendanceData: any) => {
    const response = await api.put(`/attendance/${id}`, attendanceData);
    return response.data;
  },
  
  deleteAttendance: async (id: string) => {
    const response = await api.delete(`/attendance/${id}`);
    return response.data;
  },
  
  getEmployeeAttendanceStats: async (employeeId: string, params?: { month?: string; year?: string }) => {
    const response = await api.get(`/attendance/employee/${employeeId}/stats`, { params });
    return response.data;
  },
};

// Announcements API calls
export const announcementsAPI = {
  getAllAnnouncements: async (params?: { tenantId?: string; category?: string }) => {
    const response = await api.get('/announcements', { params });
    return response.data;
  },
  
  getAnnouncementById: async (id: string) => {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  },
  
  createAnnouncement: async (announcementData: any) => {
    const response = await api.post('/announcements', announcementData);
    return response.data;
  },
  
  updateAnnouncement: async (id: string, announcementData: any) => {
    const response = await api.put(`/announcements/${id}`, announcementData);
    return response.data;
  },
  
  deleteAnnouncement: async (id: string) => {
    const response = await api.delete(`/announcements/${id}`);
    return response.data;
  },
};

export default api;
