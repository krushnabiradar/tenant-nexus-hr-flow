
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const AttendancePage = () => {
  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Attendance Management</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Calendar className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Attendance Tracking</h3>
              <p className="text-muted-foreground">
                Track employee attendance, manage time-offs, and generate reports.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyDashboardLayout>
  );
};

export default AttendancePage;
