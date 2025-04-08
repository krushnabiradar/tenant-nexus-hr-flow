
import api from "./api";

export const adminApi = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      throw error;
    }
  },
  
  // System activity
  getSystemActivity: async () => {
    try {
      const response = await api.get('/admin/activity');
      return response.data;
    } catch (error) {
      console.error("Error fetching system activity:", error);
      throw error;
    }
  },
  
  // Recent companies
  getRecentCompanies: async () => {
    try {
      const response = await api.get('/admin/companies/recent');
      return response.data;
    } catch (error) {
      console.error("Error fetching recent companies:", error);
      throw error;
    }
  },
  
  // Performance data
  getPerformanceData: async (period = 'month') => {
    try {
      const response = await api.get(`/admin/performance?period=${period}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching performance data:", error);
      throw error;
    }
  },
  
  // Stats
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      throw error;
    }
  }
};
