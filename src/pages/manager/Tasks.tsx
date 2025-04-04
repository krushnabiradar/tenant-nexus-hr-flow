
import ManagerDashboardLayout from "@/layouts/ManagerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TasksPage = () => {
  // Sample data for tasks
  const tasks = [
    { 
      id: "TASK-1234",
      title: "API Integration", 
      assignee: "Alex Johnson", 
      priority: "High",
      status: "In Progress",
      deadline: "Apr 8, 2025",
      progress: 75,
      escalated: false
    },
    { 
      id: "TASK-1235",
      title: "Database Migration", 
      assignee: "Alex Johnson", 
      priority: "Critical",
      status: "Blocked",
      deadline: "Apr 7, 2025",
      progress: 45,
      escalated: true
    },
    { 
      id: "TASK-1236",
      title: "Dashboard Redesign", 
      assignee: "Maria Garcia", 
      priority: "Medium",
      status: "In Progress",
      deadline: "Apr 15, 2025",
      progress: 60,
      escalated: false
    },
    { 
      id: "TASK-1237",
      title: "Server Optimization", 
      assignee: "James Wilson", 
      priority: "Low",
      status: "Not Started",
      deadline: "Apr 20, 2025",
      progress: 0,
      escalated: false
    },
    { 
      id: "TASK-1238",
      title: "Test Automation", 
      assignee: "Sarah Lee", 
      priority: "Medium",
      status: "In Progress",
      deadline: "Apr 12, 2025",
      progress: 80,
      escalated: false
    },
    { 
      id: "TASK-1239",
      title: "Mobile App UI", 
      assignee: "Maria Garcia", 
      priority: "High",
      status: "Review",
      deadline: "Apr 6, 2025",
      progress: 95,
      escalated: false
    },
  ];

  // Filter tasks by status
  const pendingTasks = tasks.filter(task => 
    task.status === "Not Started" || task.status === "In Progress" || task.status === "Blocked"
  );
  const escalatedTasks = tasks.filter(task => task.escalated);
  const reviewTasks = tasks.filter(task => task.status === "Review");

  return (
    <ManagerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Team Tasks</h2>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Badge className="bg-blue-100 text-blue-700">
              {pendingTasks.length} Pending
            </Badge>
            <Badge className="bg-amber-100 text-amber-700">
              {reviewTasks.length} In Review
            </Badge>
            <Badge className="bg-red-100 text-red-700">
              {escalatedTasks.length} Escalated
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <p className="text-xs text-muted-foreground">Active tasks assigned to team</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Average completion across all tasks</p>
              <Progress 
                className="mt-3" 
                value={Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter(task => 
                  new Date(task.deadline) <= new Date(new Date().setDate(new Date().getDate() + 7))
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">Tasks due in the next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {escalatedTasks.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <CardTitle>Escalated Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escalatedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            task.priority === "Critical" ? "bg-red-100 text-red-700" :
                            task.priority === "High" ? "bg-orange-100 text-orange-700" :
                            task.priority === "Medium" ? "bg-blue-100 text-blue-700" :
                            "bg-green-100 text-green-700"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            task.status === "Blocked" ? "bg-red-100 text-red-700" :
                            task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                            task.status === "Review" ? "bg-purple-100 text-purple-700" :
                            "bg-gray-100 text-gray-700"
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.deadline}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className="w-[60px]" />
                          <span>{task.progress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>All Team Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{task.assignee}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          task.priority === "Critical" ? "bg-red-100 text-red-700" :
                          task.priority === "High" ? "bg-orange-100 text-orange-700" :
                          task.priority === "Medium" ? "bg-blue-100 text-blue-700" :
                          "bg-green-100 text-green-700"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          task.status === "Blocked" ? "bg-red-100 text-red-700" :
                          task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                          task.status === "Review" ? "bg-purple-100 text-purple-700" :
                          task.status === "Not Started" ? "bg-gray-100 text-gray-700" :
                          "bg-green-100 text-green-700"
                        }
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.deadline}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="w-[60px]" />
                        <span>{task.progress}%</span>
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
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Alex Johnson', 'Maria Garcia', 'James Wilson', 'Sarah Lee'].map(member => {
                const memberTasks = tasks.filter(task => task.assignee === member);
                const avgProgress = memberTasks.length ? 
                  Math.round(memberTasks.reduce((acc, task) => acc + task.progress, 0) / memberTasks.length) : 0;
                
                return (
                  <div key={member} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{member}</p>
                        <p className="text-sm text-muted-foreground">{memberTasks.length} tasks assigned</p>
                      </div>
                      <Badge 
                        className="bg-blue-100 text-blue-700"
                      >
                        {avgProgress}% avg. progress
                      </Badge>
                    </div>
                    <Progress value={avgProgress} className="h-2" />
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {memberTasks.map(task => (
                        <Badge 
                          key={task.id}
                          variant="outline"
                          className="justify-between overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          <span className="truncate">{task.title}</span>
                          <span className="ml-1">{task.progress}%</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerDashboardLayout>
  );
};

export default TasksPage;
