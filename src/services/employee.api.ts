
import api from "./api";

export const employeeApi = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/employee/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching employee dashboard data:", error);
      throw error;
    }
  },

  // Attendance
  getAttendanceHistory: async () => {
    try {
      const response = await api.get('/attendance/history');
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance history:", error);
      throw error;
    }
  },

  // Payslips
  getPayslips: async () => {
    try {
      const response = await api.get('/payroll/employee/payslips');
      return response.data;
    } catch (error) {
      console.error("Error fetching payslips:", error);
      throw error;
    }
  },

  // Announcements
  getAnnouncements: async () => {
    try {
      const response = await api.get('/company/announcements');
      return response.data;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      throw error;
    }
  },

  // Performance
  getPerformance: async () => {
    try {
      const response = await api.get('/employee/performance');
      return response.data;
    } catch (error) {
      console.error("Error fetching performance data:", error);
      throw error;
    }
  },
};
