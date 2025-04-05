
import { Users, Calendar, Star, ClipboardCheck } from "lucide-react";
import ManagerDashboardLayout from "@/layouts/ManagerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManagerDashboard = () => {
  // Sample data for team members
  const teamMembers = [
    { name: "Alex Johnson", role: "Senior Developer", present: true, tasks: 5, performance: 92 },
    { name: "Maria Garcia", role: "UI/UX Designer", present: true, tasks: 3, performance: 88 },
    { name: "James Wilson", role: "Backend Developer", present: false, tasks: 4, performance: 85 },
    { name: "Sarah Lee", role: "QA Engineer", present: true, tasks: 2, performance: 90 },
  ];

  // Sample data for pending approvals
  const pendingApprovals = [
    { employee: "James Wilson", type: "Sick Leave", duration: "2 days", from: "Apr 5, 2025", status: "Pending" },
    { employee: "Sarah Lee", type: "Vacation", duration: "1 week", from: "Apr 10, 2025", status: "Pending" },
  ];

  return (
    <ManagerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Manager Dashboard</h2>
          <p className="text-muted-foreground">Engineering Department • 4 Team Members</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">75%</div>
                <div className="p-2 bg-green-100 rounded text-green-600 text-xs font-medium">Present</div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">3 of 4 team members present today</p>
              <Progress className="mt-3" value={75} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Leave requests awaiting your approval</p>
              <div className="mt-3 flex space-x-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Leave</Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Expense</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">Active tasks assigned to your team</p>
              <Progress className="mt-3" value={65} />
              <p className="text-xs text-muted-foreground mt-1">65% completion rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">Average performance score</p>
              <Progress className="mt-3" value={89} />
              <p className="text-xs text-green-600 mt-1">↑ 3% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.present ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Absent</Badge>
                        )}
                      </TableCell>
                      <TableCell>{member.tasks} active</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{member.performance}%</span>
                          <Progress value={member.performance} className="w-[60px]" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((approval, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{approval.employee}</p>
                            <p className="text-xs text-muted-foreground">From: {approval.from}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                            {approval.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{approval.duration}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Badge className="bg-green-100 text-green-700 cursor-pointer hover:bg-green-200">
                              Approve
                            </Badge>
                            <Badge variant="outline" className="bg-red-50 text-red-700 cursor-pointer hover:bg-red-100">
                              Reject
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground opacity-20 mb-2" />
                  <p className="text-muted-foreground">No pending approvals</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Team Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Weekly Sprint Review</p>
                    <Badge variant="outline">Apr 6, 2025</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">10:00 AM - 11:30 AM • Virtual Meeting</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Team Performance Review</p>
                    <Badge variant="outline">Apr 8, 2025</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">2:00 PM - 4:00 PM • Conference Room A</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <ClipboardCheck className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Project Milestone Review</p>
                    <Badge variant="outline">Apr 10, 2025</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">11:00 AM - 12:30 PM • Project Room</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerDashboardLayout>
  );
};

export default ManagerDashboard;
