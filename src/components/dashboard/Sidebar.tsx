
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  BarChart3, 
  CreditCard, 
  Shield, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Companies", icon: Building, href: "/admin/companies" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { name: "Billing", icon: CreditCard, href: "/admin/billing" },
    { name: "Security", icon: Shield, href: "/admin/security" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center px-6 py-4 h-16 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2 flex-1">
            <div className="h-8 w-8 bg-hrms-blue rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-lg text-hrms-slate">NexusHR</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 bg-hrms-blue rounded-md flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">N</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <div className="px-3 py-2">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              Main
            </h3>
          )}
          <nav className="mt-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100",
                  window.location.pathname === item.href 
                    ? "text-hrms-blue bg-blue-50" 
                    : "text-gray-700"
                )}
              >
                <item.icon 
                  className={cn(
                    "flex-shrink-0 mr-3 h-5 w-5",
                    window.location.pathname === item.href 
                      ? "text-hrms-blue" 
                      : "text-gray-500"
                  )} 
                  size={20}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} className="mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
