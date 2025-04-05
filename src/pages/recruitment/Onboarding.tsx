
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, CheckCircle, Circle, AlertCircle } from "lucide-react";

const OnboardingPage = () => {
  const onboardingList = [
    {
      name: "Sarah Johnson",
      position: "UX Designer",
      startDate: "Apr 15, 2025",
      progress: 75,
      tasks: [
        { id: 1, name: "Paperwork submission", status: "completed" },
        { id: 2, name: "Equipment setup", status: "completed" },
        { id: 3, name: "Training session", status: "in-progress" },
        { id: 4, name: "Team introduction", status: "pending" },
      ]
    },
    {
      name: "Michael Chen",
      position: "Frontend Developer",
      startDate: "Apr 10, 2025",
      progress: 50,
      tasks: [
        { id: 1, name: "Paperwork submission", status: "completed" },
        { id: 2, name: "Equipment setup", status: "in-progress" },
        { id: 3, name: "Training session", status: "pending" },
        { id: 4, name: "Team introduction", status: "pending" },
      ]
    },
    {
      name: "Priya Patel",
      position: "Product Manager",
      startDate: "Apr 20, 2025",
      progress: 25,
      tasks: [
        { id: 1, name: "Paperwork submission", status: "completed" },
        { id: 2, name: "Equipment setup", status: "pending" },
        { id: 3, name: "Training session", status: "pending" },
        { id: 4, name: "Team introduction", status: "pending" },
      ]
    },
    {
      name: "David Wilson",
      position: "DevOps Engineer",
      startDate: "Apr 12, 2025",
      progress: 100,
      tasks: [
        { id: 1, name: "Paperwork submission", status: "completed" },
        { id: 2, name: "Equipment setup", status: "completed" },
        { id: 3, name: "Training session", status: "completed" },
        { id: 4, name: "Team introduction", status: "completed" },
      ]
    }
  ];

  // Function to render task status icon
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "pending":
        return <Circle className="h-4 w-4 text-gray-300" />;
      default:
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Onboarding Progress</h2>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-purple-600" />
              <CardTitle>New Hire Onboarding</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {onboardingList.map((employee, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                      </div>
                      <div className="flex flex-col sm:items-end">
                        <div className="text-sm font-medium">Start Date: {employee.startDate}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">Progress:</div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-full rounded-full ${
                                employee.progress === 100 ? 'bg-green-500' : 
                                employee.progress >= 50 ? 'bg-amber-500' : 'bg-purple-500'
                              }`} 
                              style={{ width: `${employee.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{employee.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-medium mb-3">Onboarding Checklist</h4>
                    <div className="space-y-2">
                      {employee.tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                          <div className="flex items-center gap-2">
                            {renderStatusIcon(task.status)}
                            <span className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                              {task.name}
                            </span>
                          </div>
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
                            {task.status === "completed" ? "Completed" : 
                             task.status === "in-progress" ? "In Progress" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default OnboardingPage;
