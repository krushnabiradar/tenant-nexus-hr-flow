
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ChevronRight, Menu, X, CheckCircle, Users, BarChart2, Shield, LogIn, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Landing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  
  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const features = [
    {
      icon: <Users className="h-8 w-8 text-hrms-teal" />,
      title: "Centralized HR Management",
      description: "Manage all your HR operations in one place. From employee onboarding to payroll processing.",
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-hrms-blue" />,
      title: "Advanced Analytics",
      description: "Get insights into workforce trends, performance metrics, and operational efficiency.",
    },
    {
      icon: <Shield className="h-8 w-8 text-hrms-orange" />,
      title: "Multi-tenant Security",
      description: "Robust security architecture ensuring data isolation between different tenant companies.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "49",
      description: "Perfect for small businesses",
      maxEmployees: 50,
      features: [
        "Up to 50 employees",
        "Core HR functionality",
        "Employee self-service portal",
        "Basic reporting",
        "Email support",
      ],
    },
    {
      name: "Business",
      price: "99",
      description: "Growing companies",
      maxEmployees: 200,
      features: [
        "Up to 200 employees",
        "Advanced HR tools",
        "Time & attendance",
        "Performance management",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "249",
      description: "Large organizations",
      maxEmployees: 1000,
      features: [
        "Up to 1000 employees",
        "Custom workflows",
        "Advanced integrations",
        "Dedicated account manager",
        "SLA guarantees",
      ],
    },
  ];

  const handleContactUs = (planName: string) => {
    setSelectedPlan(planName);
    setContactDialogOpen(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simple validation
    if (!name || !email || !companyName || !phoneNumber) {
      toast.error("Please fill in all required fields");
      setIsSending(false);
      return;
    }
    
    // Mock API call - in a real app, this would send the data to your backend
    setTimeout(() => {
      toast.success("Your request has been sent! Our team will contact you shortly.");
      setContactDialogOpen(false);
      
      // Reset form
      setName("");
      setEmail("");
      setCompanyName("");
      setPhoneNumber("");
      setMessage("");
      setIsSending(false);
    }, 1000);
  };

  const handleDashboardRedirect = () => {
    if (user) {
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
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Navigation */}
      <header className="relative bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 bg-hrms-blue rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="ml-2 text-xl font-bold text-hrms-slate">NexusHR</span>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="#features" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                Features
              </a>
              <a href="#pricing" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                Pricing
              </a>
              <a href="#about" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                About
              </a>
              <a href="#contact" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                Contact
              </a>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-hrms-slate">Welcome, {user?.name || user?.email}</span>
                  <Button 
                    onClick={handleDashboardRedirect}
                    variant="outline"
                    className="text-hrms-blue border-hrms-blue hover:bg-hrms-blue hover:text-white"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={logout}
                    variant="ghost"
                    className="text-gray-600"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-base font-medium text-hrms-blue hover:text-blue-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-hrms-blue hover:bg-blue-700"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-hrms-blue rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-lg">N</span>
                    </div>
                    <span className="ml-2 text-xl font-bold text-hrms-slate">NexusHR</span>
                  </div>
                  <div className="-mr-2">
                    <Button
                      variant="ghost"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <a href="#features" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                      Features
                    </a>
                    <a href="#pricing" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                      Pricing
                    </a>
                    <a href="#about" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                      About
                    </a>
                    <a href="#contact" className="text-base font-medium text-gray-700 hover:text-hrms-blue">
                      Contact
                    </a>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <p className="text-hrms-slate">Welcome, {user?.name || user?.email}</p>
                    <Button 
                      onClick={handleDashboardRedirect}
                      className="w-full bg-hrms-blue hover:bg-blue-700"
                    >
                      Dashboard
                    </Button>
                    <Button 
                      onClick={logout}
                      variant="outline"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-hrms-blue hover:bg-blue-700"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Next-Generation</span>{" "}
              <span className="block text-hrms-blue xl:inline">Multi-Tenant HRMS</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              The complete HR solution for modern businesses. Manage multiple companies, 
              employees, and HR processes all from a single powerful platform.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                {isAuthenticated ? (
                  <Button
                    onClick={handleDashboardRedirect}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hrms-blue hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-hrms-blue hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Sign In
                  </Link>
                )}
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-hrms-blue bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful HR Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to manage your workforce across multiple companies
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Pricing Plans
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose the right plan for your business
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                  plan.popular ? "border-2 border-hrms-blue" : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="bg-hrms-blue text-white text-center py-1.5 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                    <span className="text-base font-medium text-gray-500">/mo per company</span>
                  </p>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={`mt-6 w-full ${plan.popular ? "bg-hrms-blue hover:bg-blue-700" : ""}`}
                    onClick={() => handleContactUs(plan.name)}
                  >
                    Contact Sales
                  </Button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                    What's included:
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-2 text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-hrms-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to streamline your HR operations?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join hundreds of companies already using NexusHR to manage their workforce efficiently.
              </p>
              <div className="mt-8">
                {isAuthenticated ? (
                  <Button
                    onClick={handleDashboardRedirect}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-hrms-blue bg-white hover:bg-blue-50"
                  >
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-hrms-blue bg-white hover:bg-blue-50"
                  >
                    Sign In
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:col-start-2">
              <p className="text-white text-lg mb-4">Trusted by companies worldwide</p>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/20 h-12 rounded-md flex items-center justify-center text-white font-medium">
                    Client {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-base text-gray-300 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2025 NexusHR. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Sales Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Sales for {selectedPlan} Plan</DialogTitle>
            <DialogDescription>
              Submit your information and we'll reach out to discuss how we can set up your company with the {selectedPlan} plan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendRequest} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
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
              <Label htmlFor="email">Email*</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name*</Label>
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
              <Label htmlFor="phone">Phone Number*</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+1 (555) 123-4567" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <textarea
                id="message"
                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us about your specific needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                className="w-full bg-hrms-blue hover:bg-blue-700"
                disabled={isSending}
              >
                {isSending ? (
                  "Sending request..."
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Landing;
