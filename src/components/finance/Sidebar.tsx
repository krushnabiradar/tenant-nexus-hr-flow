
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Banknote,
  Receipt,
  PiggyBank,
  FileText,
  BarChart,
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FinanceSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/finance" },
    { name: "Payroll", icon: Banknote, href: "/finance/payroll" },
    { name: "Taxes", icon: Receipt, href: "/finance/taxes" },
    { name: "Reimbursements", icon: PiggyBank, href: "/finance/reimbursements" },
    { name: "Reports", icon: FileText, href: "/finance/reports" },
    { name: "Analytics", icon: BarChart, href: "/finance/analytics" },
    { name: "Settings", icon: Settings, href: "/finance/settings" },
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
            <div className="h-8 w-8 bg-emerald-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-lg text-gray-800">Finance Portal</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 bg-emerald-500 rounded-md flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">F</span>
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
              Finance Management
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
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-gray-700"
                )}
              >
                <item.icon 
                  className={cn(
                    "flex-shrink-0 mr-3 h-5 w-5",
                    window.location.pathname === item.href 
                      ? "text-emerald-600" 
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

export default FinanceSidebar;
