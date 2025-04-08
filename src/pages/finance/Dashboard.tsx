
import { useState, useEffect } from "react";
import FinanceDashboardLayout from "@/layouts/FinanceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, TrendingUp, CreditCard, Users } from "lucide-react";
import { financeApi } from "@/services/finance.api";
import { useToast } from "@/hooks/use-toast";

const FinanceDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await financeApi.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch finance dashboard data:", error);
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

  if (isLoading) {
    return (
      <FinanceDashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        </div>
      </FinanceDashboardLayout>
    );
  }

  const stats = dashboardData?.stats || {
    totalPayroll: { value: "$128,450", change: "+5.5% from last month" },
    taxWithholdings: { value: "$42,350", change: "+2.1% from last month" },
    pendingReimbursements: { value: "$8,750", info: "12 requests pending" },
    activeEmployees: { value: "236", change: "+4 this month" },
    fiscalPeriod: "Q2 2025"
  };

  return (
    <FinanceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Finance Dashboard</h2>
          <p className="text-muted-foreground">Fiscal Period: {stats.fiscalPeriod}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
              <Banknote className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPayroll.value}</div>
              <p className="text-xs text-muted-foreground">{stats.totalPayroll.change}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tax Withholdings</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.taxWithholdings.value}</div>
              <p className="text-xs text-muted-foreground">{stats.taxWithholdings.change}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reimbursements</CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReimbursements.value}</div>
              <p className="text-xs text-muted-foreground">{stats.pendingReimbursements.info}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeEmployees.value}</div>
              <p className="text-xs text-muted-foreground">{stats.activeEmployees.change}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Payroll Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                <p className="text-sm text-muted-foreground">Payroll chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Department Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded-md bg-gray-50">
                <p className="text-sm text-muted-foreground">Department expense chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FinanceDashboardLayout>
  );
};

export default FinanceDashboard;
