
import ManagerDashboardLayout from "@/layouts/ManagerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const ManagerAnnouncementsPage = () => {
  return (
    <ManagerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground">Engineering Department</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <Bell className="h-16 w-16 mx-auto text-amber-500 mb-3" />
              <p className="text-muted-foreground">Team announcements will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage announcements for your team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerDashboardLayout>
  );
};

export default ManagerAnnouncementsPage;
