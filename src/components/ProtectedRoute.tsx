
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
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
