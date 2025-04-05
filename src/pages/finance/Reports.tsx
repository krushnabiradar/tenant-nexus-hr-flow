
import FinanceDashboardLayout from "@/layouts/FinanceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ReportsPage = () => {
  return (
    <FinanceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground">Finance Department</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <FileText className="h-16 w-16 mx-auto text-emerald-500 mb-3" />
              <p className="text-muted-foreground">Financial reports will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Generate and analyze financial reports and statements
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceDashboardLayout>
  );
};

export default ReportsPage;
