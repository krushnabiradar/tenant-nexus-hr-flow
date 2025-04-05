
import { ReactNode } from "react";
import EmployeeSidebar from "../components/employee/Sidebar";
import EmployeeHeader from "../components/employee/Header";

type EmployeeDashboardLayoutProps = {
  children: ReactNode;
};

const EmployeeDashboardLayout = ({ children }: EmployeeDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EmployeeHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboardLayout;
