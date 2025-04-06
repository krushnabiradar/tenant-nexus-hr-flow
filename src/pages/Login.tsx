
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Register form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Mock data for roles - in a real app, this would come from an API/backend
  const mockUsers = [
    { email: "admin@example.com", password: "password", role: "admin" },
    { email: "company@example.com", password: "password", role: "company" },
    { email: "employee@example.com", password: "password", role: "employee" },
    { email: "manager@example.com", password: "password", role: "manager" },
    { email: "finance@example.com", password: "password", role: "finance" },
    { email: "compliance@example.com", password: "password", role: "compliance" },
    { email: "recruitment@example.com", password: "password", role: "recruitment" },
  ];
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simple validation
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      setIsLoggingIn(false);
      return;
    }
    
    // Mock authentication - in a real app, this would be an API call
    setTimeout(() => {
      const user = mockUsers.find(
        (user) => user.email === loginEmail && user.password === loginPassword
      );
      
      if (user) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({
          email: user.email,
          role: user.role,
          isAuthenticated: true
        }));
        
        toast.success("Login successful!");
        
        // Redirect based on role
        switch (user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "company":
            navigate("/company");
            break;
          case "employee":
            navigate("/employee");
            break;
          case "manager":
            navigate("/manager");
            break;
          case "finance":
            navigate("/finance");
            break;
          case "compliance":
            navigate("/compliance");
            break;
          case "recruitment":
            navigate("/recruitment");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("Invalid email or password");
      }
      
      setIsLoggingIn(false);
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword || !companyName) {
      toast.error("Please fill in all fields");
      setIsRegistering(false);
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsRegistering(false);
      return;
    }
    
    // Mock registration - in a real app, this would be an API call
    setTimeout(() => {
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({
        name,
        email,
        companyName,
        role: "company", // New registrations default to company role
        isAuthenticated: true
      }));
      
      toast.success("Registration successful!");
      navigate("/company"); // Redirect to company dashboard
      setIsRegistering(false);
    }, 1000);
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
            {activeTab === "login" ? "Sign in to your account" : "Create your account"}
          </h2>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
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
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? "Signing in..." : "Sign in"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create a new account for your company
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      type="text" 
                      placeholder="Acme Inc." 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-hrms-blue hover:bg-blue-700"
                    disabled={isRegistering}
                  >
                    {isRegistering ? "Creating account..." : "Create account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
