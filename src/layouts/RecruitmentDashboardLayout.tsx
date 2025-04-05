
import { ReactNode } from "react";
import RecruitmentSidebar from "../components/recruitment/Sidebar";
import RecruitmentHeader from "../components/recruitment/Header";

type RecruitmentDashboardLayoutProps = {
  children: ReactNode;
};

const RecruitmentDashboardLayout = ({ children }: RecruitmentDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <RecruitmentSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RecruitmentHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RecruitmentDashboardLayout;
