
import api from "./api";

export const recruitmentApi = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/recruitment/dashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching recruitment dashboard data:", error);
      throw error;
    }
  },
  
  // Job listings
  getJobListings: async () => {
    try {
      const response = await api.get('/recruitment/jobs');
      return response.data;
    } catch (error) {
      console.error("Error fetching job listings:", error);
      throw error;
    }
  },
  
  // Candidates
  getCandidates: async () => {
    try {
      const response = await api.get('/recruitment/candidates');
      return response.data;
    } catch (error) {
      console.error("Error fetching candidates:", error);
      throw error;
    }
  },
  
  // Interviews
  getInterviews: async () => {
    try {
      const response = await api.get('/recruitment/interviews');
      return response.data;
    } catch (error) {
      console.error("Error fetching interviews:", error);
      throw error;
    }
  },
  
  // Onboarding
  getOnboarding: async () => {
    try {
      const response = await api.get('/recruitment/onboarding');
      return response.data;
    } catch (error) {
      console.error("Error fetching onboarding data:", error);
      throw error;
    }
  },
};
