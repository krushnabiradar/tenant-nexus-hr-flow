
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/admin/Dashboard";
import CompaniesPage from "./pages/admin/Companies";
import CompanyDashboard from "./pages/company/Dashboard";
import EmployeesPage from "./pages/company/Employees";
import AttendancePage from "./pages/company/Attendance";
import PayrollPage from "./pages/company/Payroll";
import LeavesPage from "./pages/company/Leaves";
import JobsPage from "./pages/company/Jobs";
import CompliancePage from "./pages/company/Compliance";
import NotFound from "./pages/NotFound";

// Employee Routes
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeAttendancePage from "./pages/employee/Attendance";
import EmployeePayslipsPage from "./pages/employee/Payslips";
import EmployeeLeavesPage from "./pages/employee/Leaves";
import EmployeePerformancePage from "./pages/employee/Performance";
import EmployeeAnnouncementsPage from "./pages/employee/Announcements";
import EmployeeProfilePage from "./pages/employee/Profile";

// Manager Routes
import ManagerDashboard from "./pages/manager/Dashboard";
import TeamPage from "./pages/manager/Team";
import LeaveRequestsPage from "./pages/manager/LeaveRequests";
import ManagerPerformancePage from "./pages/manager/Performance";
import TasksPage from "./pages/manager/Tasks";
import ManagerAnnouncementsPage from "./pages/manager/Announcements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/companies" element={<CompaniesPage />} />
          
          {/* Company Routes */}
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/company/employees" element={<EmployeesPage />} />
          <Route path="/company/attendance" element={<AttendancePage />} />
          <Route path="/company/payroll" element={<PayrollPage />} />
          <Route path="/company/leaves" element={<LeavesPage />} />
          <Route path="/company/jobs" element={<JobsPage />} />
          <Route path="/company/compliance" element={<CompliancePage />} />
          
          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/attendance" element={<EmployeeAttendancePage />} />
          <Route path="/employee/payslips" element={<EmployeePayslipsPage />} />
          <Route path="/employee/leaves" element={<EmployeeLeavesPage />} />
          <Route path="/employee/performance" element={<EmployeePerformancePage />} />
          <Route path="/employee/announcements" element={<EmployeeAnnouncementsPage />} />
          <Route path="/employee/profile" element={<EmployeeProfilePage />} />
          
          {/* Manager Routes */}
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/manager/team" element={<TeamPage />} />
          <Route path="/manager/leave-requests" element={<LeaveRequestsPage />} />
          <Route path="/manager/performance" element={<ManagerPerformancePage />} />
          <Route path="/manager/tasks" element={<TasksPage />} />
          <Route path="/manager/announcements" element={<ManagerAnnouncementsPage />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
