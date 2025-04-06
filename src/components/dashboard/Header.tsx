
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Menu } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="outline" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.role}</div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>Log out</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
