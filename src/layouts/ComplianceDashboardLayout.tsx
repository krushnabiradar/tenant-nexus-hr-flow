
import { ReactNode } from "react";
import ComplianceSidebar from "../components/compliance/Sidebar";
import ComplianceHeader from "../components/compliance/Header";

type ComplianceDashboardLayoutProps = {
  children: ReactNode;
};

const ComplianceDashboardLayout = ({ children }: ComplianceDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <ComplianceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ComplianceHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ComplianceDashboardLayout;
