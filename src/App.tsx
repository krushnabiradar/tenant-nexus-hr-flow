
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
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
