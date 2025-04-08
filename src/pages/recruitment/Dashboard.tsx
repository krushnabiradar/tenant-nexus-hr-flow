
import { useState, useEffect } from "react";
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, CalendarCheck, ClipboardList } from "lucide-react";
import { recruitmentApi } from "@/services/recruitment.api";
import { useToast } from "@/hooks/use-toast";

const RecruitmentDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await recruitmentApi.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch recruitment dashboard data:", error);
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
      <RecruitmentDashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        </div>
      </RecruitmentDashboardLayout>
    );
  }

  const stats = dashboardData?.stats || {
    openPositions: { value: "24", change: "+2 from last month" },
    activeCandidates: { value: "142", change: "+18 new this week" },
    interviews: { value: "38", change: "6 today" },
    onboarding: { value: "12", change: "4 pending completion" }
  };

  const recentApplications = dashboardData?.recentApplications || [
    { name: "Sarah Johnson", position: "UX Designer", department: "Design", date: "Today" },
    { name: "Michael Chen", position: "Frontend Developer", department: "Engineering", date: "Yesterday" },
    { name: "Priya Patel", position: "Product Manager", department: "Product", date: "2 days ago" },
    { name: "David Wilson", position: "DevOps Engineer", department: "Engineering", date: "3 days ago" },
  ];

  const upcomingInterviews = dashboardData?.upcomingInterviews || [
    { name: "Jessica Lee", position: "Marketing Specialist", time: "Today, 10:00 AM", interviewer: "Mark Thompson" },
    { name: "Robert Brown", position: "Backend Developer", time: "Today, 2:30 PM", interviewer: "Emma Davis" },
    { name: "Nina Rodriguez", position: "HR Manager", time: "Tomorrow, 11:00 AM", interviewer: "Alex Wright" },
    { name: "James Kim", position: "Financial Analyst", time: "Tomorrow, 3:00 PM", interviewer: "Sophia Chen" },
  ];

  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Recruitment Dashboard</h2>
          <div className="flex items-center gap-2">
            <select 
              className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.openPositions.value}</div>
              <p className="text-xs text-muted-foreground">{stats.openPositions.change}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCandidates.value}</div>
              <p className="text-xs text-muted-foreground">{stats.activeCandidates.change}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
              <CalendarCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interviews.value}</div>
              <p className="text-xs text-muted-foreground">{stats.interviews.change}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Onboarding</CardTitle>
              <ClipboardList className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.onboarding.value}</div>
              <p className="text-xs text-muted-foreground">{stats.onboarding.change}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-gray-50">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.position} - {item.department}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-gray-50">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.time}</p>
                      <p className="text-sm text-muted-foreground">with {item.interviewer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default RecruitmentDashboard;
