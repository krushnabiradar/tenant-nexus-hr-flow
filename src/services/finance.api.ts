
import { api } from "./api";

export const financeApi = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/finance/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching finance dashboard data:", error);
      throw error;
    }
  },
  
  // Payroll overview
  getPayrollOverview: async () => {
    try {
      const response = await api.get('/finance/payroll/overview');
      return response.data;
    } catch (error) {
      console.error("Error fetching payroll overview:", error);
      throw error;
    }
  },
};
