
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3, Users, Building, CreditCard } from "lucide-react";
import { tenantService, employeeService } from "@/services/api";

const AdminAnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalTenants: 0,
    activeTenants: 0,
    totalUsers: 0,
    revenue: 0
  });

  const [chartData, setChartData] = useState<any[]>([]);

  // Fetch tenants data
  const { data: tenants, isLoading: isLoadingTenants } = useQuery({
    queryKey: ['tenants'],
    queryFn: tenantService.getAllTenants
  });

  // Fetch employees data
  const { data: employees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ['employees'],
    queryFn: () => employeeService.getAllEmployees()
  });

  useEffect(() => {
    if (tenants && employees) {
      // Process analytics data
      const activeTenants = tenants.filter((tenant: any) => tenant.status === 'Active');
      
      // Calculate total revenue from subscriptions
      const revenue = tenants.reduce((total: number, tenant: any) => {
        return total + (tenant.subscriptionId?.price || 0);
      }, 0);

      setAnalyticsData({
        totalTenants: tenants.length,
        activeTenants: activeTenants.length,
        totalUsers: employees.length,
        revenue
      });

      // Process chart data for tenant plan distribution
      const planCounts = tenants.reduce((acc: any, tenant: any) => {
        const plan = tenant.subscriptionId?.plan || 'Unknown';
        acc[plan] = (acc[plan] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.keys(planCounts).map(plan => ({
        name: plan,
        count: planCounts[plan]
      }));

      setChartData(chartData);
    }
  }, [tenants, employees]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">System Analytics</h2>
        <p className="text-muted-foreground">
          Track system usage and performance metrics.
        </p>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoadingTenants ? '...' : analyticsData.totalTenants}</div>
              <p className="text-xs text-muted-foreground">
                {isLoadingTenants ? '...' : `${analyticsData.activeTenants} active`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isLoadingEmployees ? '...' : analyticsData.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Across all tenants</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${isLoadingTenants ? '...' : analyticsData.revenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">From subscriptions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Users/Tenant</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingTenants || isLoadingEmployees 
                  ? '...' 
                  : analyticsData.totalTenants 
                    ? (analyticsData.totalUsers / analyticsData.totalTenants).toFixed(1) 
                    : '0'}
              </div>
              <p className="text-xs text-muted-foreground">Users per tenant</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Tenant Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {isLoadingTenants ? (
              <div className="flex items-center justify-center p-16 text-center">
                <p>Loading chart data...</p>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" name="Number of Tenants" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center p-16 text-center">
                <div className="space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium">No Data Available</h3>
                  <p className="text-muted-foreground">
                    No tenant subscription data to display.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalyticsPage;
