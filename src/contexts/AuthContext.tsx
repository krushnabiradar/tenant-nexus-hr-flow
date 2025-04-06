
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI, tenantAPI } from "@/services/api";
import { toast } from "sonner";

// Define types for user and context
type User = {
  _id: string;
  email: string;
  role: string;
  name?: string;
  tenantId?: string;
  isAuthenticated: boolean;
};

type Tenant = {
  _id: string;
  name: string;
  domain: string;
  plan: string;
  totalEmployees: number;
  status: "Active" | "Suspended" | "Pending";
};

type AuthContextType = {
  user: User | null;
  tenant: Tenant | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if token exists in localStorage on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          setIsLoading(true);
          // Fetch current user data from API
          const userData = await authAPI.getCurrentUser();
          setUser({...userData, isAuthenticated: true});
          setIsAuthenticated(true);
          
          // If user has a tenantId, fetch tenant data
          if (userData.tenantId) {
            const tenantData = await tenantAPI.getTenant(userData.tenantId);
            setTenant(tenantData);
            localStorage.setItem('tenant', JSON.stringify(tenantData));
          }
        } catch (error) {
          console.error("Authentication error:", error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('tenant');
          setUser(null);
          setTenant(null);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Call login API
      const response = await authAPI.login(email, password);
      
      // Save token and user data
      const { token, user: userData, tenant: tenantData } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser({...userData, isAuthenticated: true});
      setIsAuthenticated(true);
      
      if (tenantData) {
        localStorage.setItem('tenant', JSON.stringify(tenantData));
        setTenant(tenantData);
      }
      
      toast.success("Login successful!");
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setTenant(null);
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
