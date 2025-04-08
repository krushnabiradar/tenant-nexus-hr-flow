
import { useState, useEffect } from "react";
import { Users, Clock, Calendar, Briefcase, CreditCard, FileText } from "lucide-react";
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import StatsCard from "@/components/dashboard/widgets/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { companyApi } from "@/services/company.api";
import { useToast } from "@/hooks/use-toast";

const CompanyDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await companyApi.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch company dashboard data:", error);
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

  // Sample data for attendance chart if API isn't available yet
  const attendanceData = dashboardData?.attendanceData || [
    { day: "Mon", present: 45, absent: 3, leave: 2 },
    { day: "Tue", present: 47, absent: 2, leave: 1 },
    { day: "Wed", present: 44, absent: 4, leave: 2 },
    { day: "Thu", present: 48, absent: 1, leave: 1 },
    { day: "Fri", present: 46, absent: 2, leave: 2 },
  ];

  const employeeStats = dashboardData?.stats || {
    totalEmployees: "128",
    presentToday: "116",
    onLeave: "6"
  };

  const recentActivities = dashboardData?.recentActivities || [
    {
      id: 1,
      type: "employee",
      title: "New employee onboarded",
      description: "Sarah Johnson joined as Senior Developer",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "leave",
      title: "Leave request approved",
      description: "Michael Brown's leave request was approved",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      type: "payroll",
      title: "Payroll processed",
      description: "Monthly payroll for June has been processed",
      timestamp: "Yesterday"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "employee":
        return <Users className="h-5 w-5 text-blue-600" />;
      case "leave":
        return <Calendar className="h-5 w-5 text-green-600" />;
      case "payroll":
        return <CreditCard className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case "employee":
        return "bg-blue-100";
      case "leave":
        return "bg-green-100";
      case "payroll":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  if (isLoading) {
    return (
      <CompanyDashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        </div>
      </CompanyDashboardLayout>
    );
  }

  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">HR Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total Employees"
            value={employeeStats.totalEmployees}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 4, isPositive: true }}
          />
          <StatsCard
            title="Present Today"
            value={employeeStats.presentToday}
            icon={<Clock className="h-6 w-6" />}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="On Leave"
            value={employeeStats.onLeave}
            icon={<Calendar className="h-6 w-6" />}
            trend={{ value: 1, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                present: { color: "#20B2AA" }, 
                absent: { color: "#FF7F50" },
                leave: { color: "#9b87f5" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} stackOffset="sign">
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="present" fill="var(--color-present)" stackId="stack" />
                    <Bar dataKey="absent" fill="var(--color-absent)" stackId="stack" />
                    <Bar dataKey="leave" fill="var(--color-leave)" stackId="stack" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Upcoming Interviews</p>
                        <p className="text-xl font-bold">{dashboardData?.todayStats?.interviews || "3"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Payroll Status</p>
                        <p className="text-xl font-bold">{dashboardData?.todayStats?.payrollStatus || "Approved"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Pending Approvals</p>
                        <p className="text-xl font-bold">{dashboardData?.todayStats?.pendingApprovals || "7"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <Briefcase className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Open Positions</p>
                        <p className="text-xl font-bold">{dashboardData?.todayStats?.openPositions || "4"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className={`h-10 w-10 rounded-full ${getActivityBg(activity.type)} flex items-center justify-center`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CompanyDashboardLayout>
  );
};

export default CompanyDashboard;
