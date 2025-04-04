
import { ReactNode } from "react";
import FinanceSidebar from "../components/finance/Sidebar";
import FinanceHeader from "../components/finance/Header";

type FinanceDashboardLayoutProps = {
  children: ReactNode;
};

const FinanceDashboardLayout = ({ children }: FinanceDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <FinanceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <FinanceHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FinanceDashboardLayout;
