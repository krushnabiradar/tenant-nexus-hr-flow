
import { useState, useEffect } from "react";
import { Building, Users, BarChart3, CreditCard } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCard from "@/components/dashboard/widgets/StatsCard";
import RecentCompanies from "@/components/dashboard/widgets/RecentCompanies";
import SystemActivity from "@/components/dashboard/widgets/SystemActivity";
import PerformanceChart from "@/components/dashboard/widgets/PerformanceChart";
import { api } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/admin/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  // Default values if API isn't ready
  const stats = dashboardData?.stats || {
    totalCompanies: { value: "124", trend: { value: 12, isPositive: true } },
    totalEmployees: { value: "3,865", trend: { value: 8, isPositive: true } },
    apiRequests: { value: "268,492", trend: { value: 5, isPositive: true } },
    monthlyRevenue: { value: "$42,850", trend: { value: 2, isPositive: false } }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        
        <div className="dashboard-grid">
          <StatsCard
            title="Total Companies"
            value={stats.totalCompanies.value}
            icon={<Building className="h-6 w-6" />}
            trend={stats.totalCompanies.trend}
          />
          <StatsCard
            title="Total Employees"
            value={stats.totalEmployees.value}
            icon={<Users className="h-6 w-6" />}
            trend={stats.totalEmployees.trend}
          />
          <StatsCard
            title="API Requests"
            value={stats.apiRequests.value}
            icon={<BarChart3 className="h-6 w-6" />}
            trend={stats.apiRequests.trend}
          />
          <StatsCard
            title="Monthly Revenue"
            value={stats.monthlyRevenue.value}
            icon={<CreditCard className="h-6 w-6" />}
            trend={stats.monthlyRevenue.trend}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart chartData={dashboardData?.performanceData} />
          </div>
          <div>
            <SystemActivity activityData={dashboardData?.activityData} />
          </div>
        </div>
        
        <div className="mt-6">
          <RecentCompanies companies={dashboardData?.recentCompanies} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
