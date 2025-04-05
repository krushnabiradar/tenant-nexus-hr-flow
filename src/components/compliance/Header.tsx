
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ComplianceHeader = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-slate-800">IT & Compliance</h1>
      </div>
      
      <div className="hidden md:flex items-center mx-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full bg-gray-50 pl-9 rounded-md border-gray-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </Button>
        
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-gray-100 px-2.5"
          >
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <User size={16} />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-500">Compliance Officer</div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ComplianceHeader;
