
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hrms-blue"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if user doesn't have the required role
    switch (user.role) {
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
