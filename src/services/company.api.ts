
import { api } from "./api";

export const companyApi = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/company/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching company dashboard data:", error);
      throw error;
    }
  },
  
  // Attendance overview
  getAttendanceOverview: async () => {
    try {
      const response = await api.get('/company/attendance/overview');
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance overview:", error);
      throw error;
    }
  },

  // Recent activities
  getRecentActivities: async () => {
    try {
      const response = await api.get('/company/activities');
      return response.data;
    } catch (error) {
      console.error("Error fetching recent activities:", error);
      throw error;
    }
  },
};
