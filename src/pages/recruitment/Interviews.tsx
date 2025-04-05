
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Clock, Users } from "lucide-react";

const InterviewsPage = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  const upcomingInterviews = [
    { 
      candidate: "Jessica Lee", 
      position: "Senior Frontend Developer",
      time: "10:00 AM - 11:00 AM", 
      interviewers: ["Mark Thompson", "Anna Lee"],
      type: "Technical"
    },
    { 
      candidate: "Michael Smith", 
      position: "UX/UI Designer",
      time: "11:30 AM - 12:30 PM", 
      interviewers: ["Emma Davis", "John Wilson"],
      type: "Portfolio Review"
    },
    { 
      candidate: "David Wilson", 
      position: "DevOps Engineer",
      time: "2:00 PM - 3:00 PM", 
      interviewers: ["Chris Parker", "Sophia Chen"],
      type: "Technical"
    },
    { 
      candidate: "Sarah Brown", 
      position: "Marketing Specialist",
      time: "4:00 PM - 5:00 PM", 
      interviewers: ["Robert Jones", "Jennifer Smith"],
      type: "Culture Fit"
    }
  ];

  const scheduledInterviews = [
    { 
      date: "Tomorrow",
      interviews: [
        { candidate: "James Taylor", position: "HR Coordinator", time: "9:00 AM", type: "Initial" },
        { candidate: "Olivia Davis", position: "Data Analyst", time: "1:00 PM", type: "Technical" }
      ]
    },
    { 
      date: "Wednesday, April 7",
      interviews: [
        { candidate: "Emma Johnson", position: "Product Manager", time: "10:30 AM", type: "Case Study" },
        { candidate: "Ryan Thomas", position: "Sales Representative", time: "2:30 PM", type: "Role Play" },
        { candidate: "Sophia Martinez", position: "Content Writer", time: "4:00 PM", type: "Portfolio Review" }
      ]
    },
    { 
      date: "Thursday, April 8",
      interviews: [
        { candidate: "William Brown", position: "Backend Developer", time: "11:00 AM", type: "Technical" },
        { candidate: "Ava Wilson", position: "Graphic Designer", time: "3:00 PM", type: "Portfolio Review" }
      ]
    }
  ];

  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Interviews</h2>
          <div className="text-sm font-medium text-gray-500">
            Today is {formattedDate}
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-purple-600" />
              <CardTitle>Today's Interviews</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.length > 0 ? (
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                        <Clock className="h-4 w-4" />
                        {interview.time}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Interviewers:</span> 
                        <span className="text-muted-foreground">{interview.interviewers.join(", ")}</span>
                      </div>
                      <div className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium w-fit">
                        {interview.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No interviews scheduled for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-blue-600" />
              <CardTitle>Upcoming Interviews</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scheduledInterviews.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h3 className="font-medium mb-3 text-gray-700">{day.date}</h3>
                  <div className="space-y-2">
                    {day.interviews.map((interview, interviewIndex) => (
                      <div key={interviewIndex} className="p-3 border border-gray-100 rounded-md bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h4 className="font-medium">{interview.candidate}</h4>
                          <p className="text-sm text-muted-foreground">{interview.position}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{interview.time}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                            {interview.type}
                          </span>
                        </div>
                      </div>
                    ))}
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

export default InterviewsPage;
