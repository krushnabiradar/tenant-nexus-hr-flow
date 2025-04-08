
import { useState, useEffect } from "react";
import { Clock, Calendar, CreditCard, Bell, Star } from "lucide-react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { employeeApi } from "@/services/employee.api";
import { useToast } from "@/hooks/use-toast";

const EmployeeDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await employeeApi.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
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
      <EmployeeDashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        </div>
      </EmployeeDashboardLayout>
    );
  }

  // Use dummy data if the API isn't ready yet
  const attendance = dashboardData?.attendance || { 
    status: "Checked In", 
    time: "9:05 AM" 
  };
  
  const leaveBalance = dashboardData?.leaveBalance || { 
    annual: 12, 
    sick: 5, 
    personal: 2 
  };
  
  const latestPayslip = dashboardData?.latestPayslip || { 
    month: "March 2025", 
    amount: "$4,850.00", 
    date: "April 1, 2025" 
  };
  
  const announcements = dashboardData?.announcements || [
    {
      id: 1,
      type: "General",
      title: "Quarterly town hall meeting",
      content: "Join us for our Q2 town hall on April 15th at 10:00 AM.",
      date: "2 days ago",
      icon: "Bell",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    {
      id: 2,
      type: "Policy",
      title: "New health insurance policy",
      content: "Our health insurance policy has been updated. Please review the changes.",
      date: "1 week ago",
      icon: "Bell",
      iconColor: "text-green-600",
      iconBg: "bg-green-100"
    },
    {
      id: 3,
      type: "Event",
      title: "Office closed for holiday",
      content: "The office will be closed on April 22nd for the national holiday.",
      date: "2 weeks ago",
      icon: "Bell",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100"
    }
  ];
  
  const performance = dashboardData?.performance || { 
    rating: "4.8/5.0", 
    technicalSkills: "4.9/5", 
    communication: "4.7/5" 
  };

  // Render the IconComponent based on the icon name from the API
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Bell":
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Employee Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Today's Status</div>
                  <div className="mt-1 flex items-center">
                    <div className="text-xl font-semibold">{attendance.status}</div>
                    <span className="ml-2 text-sm text-gray-500">{attendance.time}</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      {attendance.status === "Checked In" ? "Check Out" : "Check In"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-semibold">{leaveBalance.annual}</div>
                      <div className="text-xs text-gray-500">Annual</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-semibold">{leaveBalance.sick}</div>
                      <div className="text-xs text-gray-500">Sick</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-semibold">{leaveBalance.personal}</div>
                      <div className="text-xs text-gray-500">Personal</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      Apply for Leave
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Latest Payslip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">{latestPayslip.month}</div>
                  <div className="mt-1 text-xl font-semibold">{latestPayslip.amount}</div>
                  <div className="mt-1 text-xs text-gray-500">Credited on {latestPayslip.date}</div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-start space-x-4">
                      <div className={`h-10 w-10 rounded-full ${announcement.iconBg} flex items-center justify-center`}>
                        {renderIcon(announcement.icon)}
                      </div>
                      <div>
                        <p className="font-medium">{announcement.title}</p>
                        <p className="text-sm text-gray-500">{announcement.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{announcement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-2xl font-bold">{performance.rating}</p>
                    <p className="text-sm text-gray-500">Last performance review</p>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical Skills</span>
                      <span>{performance.technicalSkills}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Communication</span>
                      <span>{performance.communication}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default EmployeeDashboard;
