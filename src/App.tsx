
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import CompaniesPage from "./pages/admin/Companies";
import UsersPage from "./pages/admin/Users";
import AdminAnalyticsPage from "./pages/admin/Analytics";
import BillingPage from "./pages/admin/Billing";
import SecurityPage from "./pages/admin/Security";
import SettingsPage from "./pages/admin/Settings";
import CompanyDashboard from "./pages/company/Dashboard";
import EmployeesPage from "./pages/company/Employees";
import AttendancePage from "./pages/company/Attendance";
import PayrollPage from "./pages/company/Payroll";
import LeavesPage from "./pages/company/Leaves";
import JobsPage from "./pages/company/Jobs";
import CompliancePage from "./pages/company/Compliance";

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

// Finance Routes
import FinanceDashboard from "./pages/finance/Dashboard";
import FinancePayrollPage from "./pages/finance/Payroll";
import TaxesPage from "./pages/finance/Taxes";
import ReimbursementsPage from "./pages/finance/Reimbursements";
import ReportsPage from "./pages/finance/Reports";
import FinanceAnalyticsPage from "./pages/finance/Analytics";

// IT & Compliance Routes
import ComplianceDashboard from "./pages/compliance/Dashboard";
import SecurityLogsPage from "./pages/compliance/SecurityLogs";
import UserAccessPage from "./pages/compliance/UserAccess";
import ComplianceReportsPage from "./pages/compliance/Reports";
import AuditLogsPage from "./pages/compliance/AuditLogs";
import DataManagementPage from "./pages/compliance/DataManagement";
import ActivityMonitorPage from "./pages/compliance/Activity";
import ComplianceSettingsPage from "./pages/compliance/Settings";

// Recruitment Routes
import RecruitmentDashboard from "./pages/recruitment/Dashboard";
import RecruitmentJobsPage from "./pages/recruitment/Jobs";
import CandidatesPage from "./pages/recruitment/Candidates";
import InterviewsPage from "./pages/recruitment/Interviews";
import OnboardingPage from "./pages/recruitment/Onboarding";
import OffersPage from "./pages/recruitment/Offers";
import RecruitmentReportsPage from "./pages/recruitment/Reports";
import RecruitmentSettingsPage from "./pages/recruitment/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/companies" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CompaniesPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/billing" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BillingPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/security" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SecurityPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Company Routes */}
            <Route path="/company" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CompanyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/company/employees" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <EmployeesPage />
              </ProtectedRoute>
            } />
            <Route path="/company/attendance" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <AttendancePage />
              </ProtectedRoute>
            } />
            <Route path="/company/payroll" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <PayrollPage />
              </ProtectedRoute>
            } />
            <Route path="/company/leaves" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <LeavesPage />
              </ProtectedRoute>
            } />
            <Route path="/company/jobs" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobsPage />
              </ProtectedRoute>
            } />
            <Route path="/company/compliance" element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CompliancePage />
              </ProtectedRoute>
            } />
            
            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            <Route path="/employee/attendance" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeAttendancePage />
              </ProtectedRoute>
            } />
            <Route path="/employee/payslips" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeePayslipsPage />
              </ProtectedRoute>
            } />
            <Route path="/employee/leaves" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeLeavesPage />
              </ProtectedRoute>
            } />
            <Route path="/employee/performance" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeePerformancePage />
              </ProtectedRoute>
            } />
            <Route path="/employee/announcements" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeAnnouncementsPage />
              </ProtectedRoute>
            } />
            <Route path="/employee/profile" element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Manager Routes */}
            <Route path="/manager" element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/manager/team" element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <TeamPage />
              </ProtectedRoute>
            } />
            <Route path="/manager/leave-requests" element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <LeaveRequestsPage />
              </ProtectedRoute>
            } />
            <Route path="/manager/performance" element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerPerformancePage />
              </ProtectedRoute>
            } />
            <Route path="/manager/tasks" element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <TasksPage />
              </ProtectedRoute>
            } />
            <Route path="/manager/announcements" element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerAnnouncementsPage />
              </ProtectedRoute>
            } />
            
            {/* Finance Routes */}
            <Route path="/finance" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <FinanceDashboard />
              </ProtectedRoute>
            } />
            <Route path="/finance/payroll" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <FinancePayrollPage />
              </ProtectedRoute>
            } />
            <Route path="/finance/taxes" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <TaxesPage />
              </ProtectedRoute>
            } />
            <Route path="/finance/reimbursements" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <ReimbursementsPage />
              </ProtectedRoute>
            } />
            <Route path="/finance/reports" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <ReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/finance/analytics" element={
              <ProtectedRoute allowedRoles={["finance"]}>
                <FinanceAnalyticsPage />
              </ProtectedRoute>
            } />
            
            {/* IT & Compliance Routes */}
            <Route path="/compliance" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <ComplianceDashboard />
              </ProtectedRoute>
            } />
            <Route path="/compliance/security-logs" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <SecurityLogsPage />
              </ProtectedRoute>
            } />
            <Route path="/compliance/user-access" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <UserAccessPage />
              </ProtectedRoute>
            } />
            <Route path="/compliance/reports" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <ComplianceReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/compliance/audit-logs" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <AuditLogsPage />
              </ProtectedRoute>
            } />
            <Route path="/compliance/data-management" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <DataManagementPage />
              </ProtectedRoute>
            } />
            <Route path="/compliance/activity" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <ActivityMonitorPage />
              </ProtectedRoute>
            } />
            <Route path="/compliance/settings" element={
              <ProtectedRoute allowedRoles={["compliance"]}>
                <ComplianceSettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Recruitment Routes */}
            <Route path="/recruitment" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <RecruitmentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/jobs" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <RecruitmentJobsPage />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/candidates" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <CandidatesPage />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/interviews" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <InterviewsPage />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/onboarding" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <OnboardingPage />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/offers" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <OffersPage />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/reports" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <RecruitmentReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/recruitment/settings" element={
              <ProtectedRoute allowedRoles={["recruitment"]}>
                <RecruitmentSettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
