
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Show loading state or spinner while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Map the backend roles to frontend roles for route protection
  const mapRole = (backendRole: string) => {
    switch (backendRole) {
      case "SuperAdmin": return "admin";
      case "HR": return "company";
      case "Manager": return "manager";
      case "Employee": return "employee";
      default: return backendRole.toLowerCase();
    }
  };
  
  const mappedUserRole = user ? mapRole(user.role) : '';
  
  if (allowedRoles && user && !allowedRoles.includes(mappedUserRole)) {
    // Redirect to appropriate dashboard if user doesn't have the required role
    switch (mappedUserRole) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "company":
        return <Navigate to="/company" replace />;
      case "employee":
        return <Navigate to="/employee" replace />;
      case "manager":
        return <Navigate to="/manager" replace />;
      case "finance":
        return <Navigate to="/finance" replace />;
      case "compliance":
        return <Navigate to="/compliance" replace />;
      case "recruitment":
        return <Navigate to="/recruitment" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
