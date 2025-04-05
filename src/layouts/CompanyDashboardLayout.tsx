
import { ReactNode } from "react";
import CompanySidebar from "../components/company/Sidebar";
import CompanyHeader from "../components/company/Header";

type CompanyDashboardLayoutProps = {
  children: ReactNode;
};

const CompanyDashboardLayout = ({ children }: CompanyDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <CompanySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CompanyHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboardLayout;
