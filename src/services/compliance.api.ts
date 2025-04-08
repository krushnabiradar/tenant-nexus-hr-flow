
import { api } from "./api";

export const complianceApi = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/compliance/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching compliance dashboard data:", error);
      throw error;
    }
  },
  
  // Security logs
  getSecurityLogs: async () => {
    try {
      const response = await api.get('/compliance/security-logs');
      return response.data;
    } catch (error) {
      console.error("Error fetching security logs:", error);
      throw error;
    }
  },
  
  // Compliance reports
  getComplianceReports: async () => {
    try {
      const response = await api.get('/compliance/reports');
      return response.data;
    } catch (error) {
      console.error("Error fetching compliance reports:", error);
      throw error;
    }
  },
};
