
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define user types
export type UserRole = "SuperAdmin" | "HR" | "Manager" | "Employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // For demo purposes, we'll simulate authentication with localStorage
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      // In a real app, this would be an API request to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll use some hardcoded credentials
      let foundUser: User | null = null;
      
      if (email === "admin@example.com" && password === "password") {
        foundUser = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "SuperAdmin"
        };
      } else if (email === "hr@example.com" && password === "password") {
        foundUser = {
          id: "2",
          name: "HR Manager",
          email: "hr@example.com",
          role: "HR",
          tenantId: "tenant-1"
        };
      } else if (email === "manager@example.com" && password === "password") {
        foundUser = {
          id: "3",
          name: "Department Manager",
          email: "manager@example.com",
          role: "Manager",
          tenantId: "tenant-1"
        };
      } else if (email === "employee@example.com" && password === "password") {
        foundUser = {
          id: "4",
          name: "Regular Employee",
          email: "employee@example.com",
          role: "Employee",
          tenantId: "tenant-1"
        };
      }
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // Set user data
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      
      // Redirect based on role
      redirectBasedOnRole(foundUser.role);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case "SuperAdmin":
        navigate("/admin");
        break;
      case "HR":
        navigate("/company");
        break;
      case "Manager":
        navigate("/manager");
        break;
      case "Employee":
        navigate("/employee");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
