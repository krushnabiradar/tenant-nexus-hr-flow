
import { ReactNode } from "react";
import ManagerSidebar from "../components/manager/Sidebar";
import ManagerHeader from "../components/manager/Header";

type ManagerDashboardLayoutProps = {
  children: ReactNode;
};

const ManagerDashboardLayout = ({ children }: ManagerDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ManagerHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboardLayout;
