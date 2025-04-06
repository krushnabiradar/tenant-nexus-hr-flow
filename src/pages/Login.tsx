
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      await login(loginEmail, loginPassword);
      
      // The navigation will happen in the useEffect hook in the AuthProvider
      // based on the role of the user
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Redirect based on role
      switch (user.role) {
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
    } catch (error) {
      // Error is handled in the login function
      console.error("Login error:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <div className="h-12 w-12 bg-hrms-blue rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <span className="ml-2 text-2xl font-bold text-hrms-slate">NexusHR</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Contact your administrator if you don't have access
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={loginEmail} 
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-hrms-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-hrms-blue hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Need a subscription for your company?{" "}
            <Link to="/#pricing" className="text-hrms-blue hover:underline">
              View pricing plans
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
