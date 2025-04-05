
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText, Calendar, Users } from "lucide-react";

const AnnouncementsPage = () => {
  const announcements = [
    {
      id: 1,
      type: "General",
      title: "Quarterly town hall meeting",
      content: "Join us for our Q2 town hall on April 15th at 10:00 AM. We'll be discussing company performance, upcoming projects, and recognizing top performers. The meeting will be held in the main conference room and also streamed live for remote employees.",
      date: "Apr 2, 2025",
      icon: Bell,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    {
      id: 2,
      type: "Policy",
      title: "New health insurance policy",
      content: "Our health insurance policy has been updated effective May 1st. Key changes include expanded mental health coverage, reduced copays for preventive care, and a new telemedicine option. Please review the updated policy document in the HR portal and reach out to HR with any questions.",
      date: "Mar 28, 2025",
      icon: FileText,
      iconColor: "text-green-600",
      iconBg: "bg-green-100"
    },
    {
      id: 3,
      type: "Event",
      title: "Office closed for holiday",
      content: "The office will be closed on April 22nd for the national holiday. All employees are encouraged to enjoy the day off. For any critical issues, the on-call support team will be available through the regular emergency channels.",
      date: "Mar 22, 2025",
      icon: Calendar,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    {
      id: 4,
      type: "Team",
      title: "Welcome new team members",
      content: "Please join us in welcoming Sarah Johnson and Michael Smith who joined our Engineering department this week. Sarah joins as a Senior Frontend Developer with 8 years of experience, and Michael joins as a DevOps Engineer with specialization in cloud infrastructure. Take a moment to say hello when you see them around!",
      date: "Mar 20, 2025",
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100"
    },
    {
      id: 5,
      type: "General",
      title: "Office maintenance schedule",
      content: "Building management has informed us that there will be scheduled maintenance of the air conditioning system on Saturday, April 5th. If you're planning to work from the office that day, please note that some areas may be warmer than usual. The maintenance is expected to be completed by 4:00 PM.",
      date: "Mar 15, 2025",
      icon: Bell,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    {
      id: 6,
      type: "Policy",
      title: "Updated travel expense policy",
      content: "The company travel expense policy has been updated with new per diem rates and simplified reimbursement procedures. The new policy aims to make business travel more convenient while ensuring proper cost management. Please review the updated policy before your next business trip.",
      date: "Mar 10, 2025",
      icon: FileText,
      iconColor: "text-green-600",
      iconBg: "bg-green-100"
    },
  ];

  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Announcements & Updates</h2>
        
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`h-10 w-10 rounded-full ${announcement.iconBg} flex items-center justify-center mt-1`}>
                    <announcement.icon className={`h-5 w-5 ${announcement.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-lg">{announcement.title}</h3>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                          {announcement.type}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">{announcement.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{announcement.content}</p>
                    <div className="flex justify-end mt-4">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Load More
          </button>
        </div>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default AnnouncementsPage;
