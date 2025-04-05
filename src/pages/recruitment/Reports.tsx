
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const ReportsPage = () => {
  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recruitment Reports</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Hiring Reports</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <BarChart className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track recruitment metrics and generate detailed reports.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default ReportsPage;
