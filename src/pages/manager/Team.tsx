
import ManagerDashboardLayout from "@/layouts/ManagerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeamPage = () => {
  // Sample data for team members
  const teamMembers = [
    { 
      name: "Alex Johnson", 
      role: "Senior Developer", 
      email: "alex.j@acmeinc.com",
      phone: "555-123-4567",
      status: "Active",
      present: true, 
      tasks: 5, 
      performance: 92,
      progress: [
        { project: "API Integration", completion: 85 },
        { project: "Database Migration", completion: 60 },
      ]
    },
    { 
      name: "Maria Garcia", 
      role: "UI/UX Designer",
      email: "maria.g@acmeinc.com",
      phone: "555-234-5678", 
      status: "Active",
      present: true, 
      tasks: 3, 
      performance: 88,
      progress: [
        { project: "Dashboard Redesign", completion: 75 },
        { project: "Mobile App UI", completion: 90 },
      ]
    },
    { 
      name: "James Wilson", 
      role: "Backend Developer",
      email: "james.w@acmeinc.com",
      phone: "555-345-6789", 
      status: "On Leave",
      present: false, 
      tasks: 4, 
      performance: 85,
      progress: [
        { project: "Server Optimization", completion: 50 },
        { project: "Authentication System", completion: 80 },
      ]
    },
    { 
      name: "Sarah Lee", 
      role: "QA Engineer",
      email: "sarah.l@acmeinc.com",
      phone: "555-456-7890", 
      status: "Active",
      present: true, 
      tasks: 2, 
      performance: 90,
      progress: [
        { project: "Test Automation", completion: 95 },
        { project: "Bug Reporting System", completion: 70 },
      ]
    },
  ];

  return (
    <ManagerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Team Management</h2>
          <p className="text-muted-foreground">Engineering Department</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Active team members</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">3 of 4 members present</p>
              <Progress className="mt-3" value={75} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Task Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Average task completion rate</p>
              <Progress className="mt-3" value={68} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-green-600">↑ 3% from last month</p>
              <Progress className="mt-3" value={89} />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 max-w-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Tasks</TableHead>
                      <TableHead className="hidden md:table-cell">Performance</TableHead>
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
                          <div>
                            <p className="text-sm">{member.email}</p>
                            <p className="text-sm text-muted-foreground">{member.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {member.status === "Active" ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                              {member.status}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{member.tasks} active</TableCell>
                        <TableCell className="hidden md:table-cell">
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
          </TabsContent>
          
          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Overall Score</TableHead>
                      <TableHead>Completed Tasks</TableHead>
                      <TableHead>Quality Score</TableHead>
                      <TableHead>Trend</TableHead>
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
                          <div className="flex items-center gap-2">
                            <Progress value={member.performance} className="w-[60px]" />
                            <span>{member.performance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{Math.floor(Math.random() * 20) + 10} tasks</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.floor(Math.random() * 15) + 80} className="w-[60px]" />
                            <span>{Math.floor(Math.random() * 15) + 80}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {Math.random() > 0.5 ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">↑ Improving</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">→ Stable</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assignments" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.flatMap(member =>
                      member.progress.map((project, idx) => (
                        <TableRow key={`${member.name}-${idx}`}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </TableCell>
                          <TableCell>{project.project}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={project.completion} className="w-[100px]" />
                              <span>{project.completion}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(2025, 3, Math.floor(Math.random() * 20) + 10).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </TableCell>
                          <TableCell>
                            {project.completion >= 90 ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Almost Complete</Badge>
                            ) : project.completion >= 50 ? (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">In Progress</Badge>
                            ) : (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Started</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Monday</TableHead>
                      <TableHead>Tuesday</TableHead>
                      <TableHead>Wednesday</TableHead>
                      <TableHead>Thursday</TableHead>
                      <TableHead>Friday</TableHead>
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
                        {[...Array(5)].map((_, idx) => {
                          const isPresentRandom = Math.random() > 0.2;
                          return (
                            <TableCell key={idx}>
                              {isPresentRandom ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Absent</Badge>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ManagerDashboardLayout>
  );
};

export default TeamPage;
