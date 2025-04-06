
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types for user and context
type User = {
  email: string;
  role: string;
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
  login: (user: User, tenant?: Tenant) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage on mount
    const storedUser = localStorage.getItem("user");
    const storedTenant = localStorage.getItem("tenant");
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(parsedUser.isAuthenticated);
    }
    
    if (storedTenant) {
      try {
        const parsedTenant = JSON.parse(storedTenant);
        setTenant(parsedTenant);
      } catch (error) {
        console.error("Error parsing tenant data:", error);
      }
    }
  }, []);

  const login = (userData: User, tenantData?: Tenant) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    
    if (tenantData) {
      localStorage.setItem("tenant", JSON.stringify(tenantData));
      setTenant(tenantData);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tenant");
    setUser(null);
    setTenant(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout, isAuthenticated }}>
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
