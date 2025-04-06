
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has the required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to the appropriate dashboard based on role
    switch (user.role) {
      case "SuperAdmin":
        return <Navigate to="/admin" replace />;
      case "HR":
        return <Navigate to="/company" replace />;
      case "Manager":
        return <Navigate to="/manager" replace />;
      case "Employee":
        return <Navigate to="/employee" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;
