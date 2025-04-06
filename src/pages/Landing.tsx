
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">HR Management System</h1>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <Button asChild variant="outline">
                  <Link to={`/${user?.role === "SuperAdmin" ? "admin" : user?.role === "HR" ? "company" : user?.role === "Manager" ? "manager" : "employee"}`}>
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Complete HR Management Solution</h2>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your HR operations with our comprehensive platform designed for modern businesses.
            </p>
            
            {!isAuthenticated && (
              <Button asChild size="lg" className="mb-12">
                <Link to="/login">Get Started</Link>
              </Button>
            )}
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Employee Management</h3>
                <p className="text-gray-600">
                  Maintain complete employee records and streamline onboarding processes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Attendance Tracking</h3>
                <p className="text-gray-600">
                  Track attendance, manage leaves, and monitor work hours efficiently.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Payroll Processing</h3>
                <p className="text-gray-600">
                  Automate payroll calculations and ensure timely employee payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>&copy; 2025 HR Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
