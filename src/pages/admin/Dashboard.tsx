
import { useState, useEffect } from "react";
import { Building, Users, BarChart3, CreditCard } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCard from "@/components/dashboard/widgets/StatsCard";
import RecentCompanies from "@/components/dashboard/widgets/RecentCompanies";
import SystemActivity from "@/components/dashboard/widgets/SystemActivity";
import PerformanceChart from "@/components/dashboard/widgets/PerformanceChart";
import { adminApi } from "@/services/admin.api";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [activityData, setActivityData] = useState<any>(null);
  const [recentCompanies, setRecentCompanies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all required data in parallel
      const [statsData, performData, activityResult, companiesData] = await Promise.all([
        adminApi.getStats(),
        adminApi.getPerformanceData(),
        adminApi.getSystemActivity(),
        adminApi.getRecentCompanies()
      ]);
      
      setStats(statsData);
      setPerformanceData(performData);
      setActivityData(activityResult);
      setRecentCompanies(companiesData);
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

  useEffect(() => {
    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hrms-blue"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Companies"
            value={stats?.totalCompanies?.value || "0"}
            icon={<Building className="h-6 w-6" />}
            trend={stats?.totalCompanies?.trend || { value: 0, isPositive: true }}
          />
          <StatsCard
            title="Total Employees"
            value={stats?.totalEmployees?.value || "0"}
            icon={<Users className="h-6 w-6" />}
            trend={stats?.totalEmployees?.trend || { value: 0, isPositive: true }}
          />
          <StatsCard
            title="API Requests"
            value={stats?.apiRequests?.value || "0"}
            icon={<BarChart3 className="h-6 w-6" />}
            trend={stats?.apiRequests?.trend || { value: 0, isPositive: true }}
          />
          <StatsCard
            title="Monthly Revenue"
            value={stats?.monthlyRevenue?.value || "$0"}
            icon={<CreditCard className="h-6 w-6" />}
            trend={stats?.monthlyRevenue?.trend || { value: 0, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart chartData={performanceData} />
          </div>
          <div>
            <SystemActivity activityData={activityData} />
          </div>
        </div>
        
        <div className="mt-6">
          <RecentCompanies companies={recentCompanies} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
