
import FinanceDashboardLayout from "@/layouts/FinanceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <FinanceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Financial Analytics</h2>
          <p className="text-muted-foreground">Finance Department</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <BarChart className="h-16 w-16 mx-auto text-emerald-500 mb-3" />
              <p className="text-muted-foreground">Financial analytics will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Visualize financial trends and patterns through interactive charts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceDashboardLayout>
  );
};

export default AnalyticsPage;
