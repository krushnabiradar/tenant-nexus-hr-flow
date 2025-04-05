
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const LeavesPage = () => {
  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Leave Management</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Calendar className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Leave Request System</h3>
              <p className="text-muted-foreground">
                Manage employee leave requests, approvals, and leave balances.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyDashboardLayout>
  );
};

export default LeavesPage;
