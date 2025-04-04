
import { Users, Clock, Calendar, Briefcase, CreditCard, FileText } from "lucide-react";
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import StatsCard from "@/components/dashboard/widgets/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CompanyDashboard = () => {
  // Sample data for attendance chart
  const attendanceData = [
    { day: "Mon", present: 45, absent: 3, leave: 2 },
    { day: "Tue", present: 47, absent: 2, leave: 1 },
    { day: "Wed", present: 44, absent: 4, leave: 2 },
    { day: "Thu", present: 48, absent: 1, leave: 1 },
    { day: "Fri", present: 46, absent: 2, leave: 2 },
  ];

  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">HR Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total Employees"
            value="128"
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 4, isPositive: true }}
          />
          <StatsCard
            title="Present Today"
            value="116"
            icon={<Clock className="h-6 w-6" />}
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="On Leave"
            value="6"
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
                        <p className="text-xl font-bold">3</p>
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
                        <p className="text-xl font-bold">Approved</p>
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
                        <p className="text-xl font-bold">7</p>
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
                        <p className="text-xl font-bold">4</p>
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
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">New employee onboarded</p>
                    <p className="text-sm text-gray-500">Sarah Johnson joined as Senior Developer</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Leave request approved</p>
                    <p className="text-sm text-gray-500">Michael Brown's leave request was approved</p>
                    <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Payroll processed</p>
                    <p className="text-sm text-gray-500">Monthly payroll for June has been processed</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CompanyDashboardLayout>
  );
};

export default CompanyDashboard;
