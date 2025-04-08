
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authAPI } from "@/services/api";

// Define types for user and context
type User = {
  email: string;
  role: "admin" | "company" | "employee" | "manager" | "finance" | "compliance" | "recruitment";
  name?: string;
  tenantId?: string;
  isAuthenticated: boolean;
};

type Tenant = {
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
    const token = localStorage.getItem("token");
    
    if (token) {
      // Verify the token and get current user data
      const fetchCurrentUser = async () => {
        try {
          const { user: userData, tenant: tenantData } = await authAPI.getCurrentUser();
          
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            
            if (tenantData) {
              setTenant(tenantData);
            }
          } else {
            // Token is invalid or expired
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
          localStorage.removeItem("token");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token, user: userData, tenant: tenantData } = await authAPI.login(email, password);
      
      // Store token
      localStorage.setItem("token", token);
      
      // Set user and auth state
      setUser(userData);
      setIsAuthenticated(true);
      
      // Set tenant if available
      if (tenantData) {
        setTenant(tenantData);
      }
      
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTenant(null);
    setIsAuthenticated(false);
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
