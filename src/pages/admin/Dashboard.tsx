
import { Building, Users, BarChart3, CreditCard } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCard from "@/components/dashboard/widgets/StatsCard";
import RecentCompanies from "@/components/dashboard/widgets/RecentCompanies";
import SystemActivity from "@/components/dashboard/widgets/SystemActivity";
import PerformanceChart from "@/components/dashboard/widgets/PerformanceChart";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        
        <div className="dashboard-grid">
          <StatsCard
            title="Total Companies"
            value="124"
            icon={<Building className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Employees"
            value="3,865"
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="API Requests"
            value="268,492"
            icon={<BarChart3 className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Monthly Revenue"
            value="$42,850"
            icon={<CreditCard className="h-6 w-6" />}
            trend={{ value: 2, isPositive: false }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <SystemActivity />
          </div>
        </div>
        
        <div className="mt-6">
          <RecentCompanies />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
