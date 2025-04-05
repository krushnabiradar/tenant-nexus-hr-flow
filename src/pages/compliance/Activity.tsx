
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const ActivityMonitorPage = () => {
  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Activity Monitoring</h2>
          <p className="text-muted-foreground">Real-time system activity tracking</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Activity Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <Clock className="h-16 w-16 mx-auto text-indigo-500 mb-3" />
              <p className="text-muted-foreground">Real-time activity monitoring will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Track system and user activities in real-time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComplianceDashboardLayout>
  );
};

export default ActivityMonitorPage;
