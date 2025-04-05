
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">System Analytics</h2>
        <p className="text-muted-foreground">
          Track system usage and performance metrics.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <BarChart3 className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Usage Metrics</h3>
              <p className="text-muted-foreground">
                Platform-wide analytics and usage statistics.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
