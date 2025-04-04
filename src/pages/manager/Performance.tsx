
import ManagerDashboardLayout from "@/layouts/ManagerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const ManagerPerformancePage = () => {
  return (
    <ManagerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Team Performance</h2>
          <p className="text-muted-foreground">Engineering Department</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <Star className="h-16 w-16 mx-auto text-amber-500 mb-3" />
              <p className="text-muted-foreground">Team Performance analytics will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Showing individual and team performance metrics, goals, and evaluations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerDashboardLayout>
  );
};

export default ManagerPerformancePage;
