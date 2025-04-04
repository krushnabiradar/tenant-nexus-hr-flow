
import FinanceDashboardLayout from "@/layouts/FinanceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

const ReimbursementsPage = () => {
  return (
    <FinanceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Expense Reimbursements</h2>
          <p className="text-muted-foreground">Finance Department</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reimbursement Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <PiggyBank className="h-16 w-16 mx-auto text-emerald-500 mb-3" />
              <p className="text-muted-foreground">Expense reimbursement tracking will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Process employee expense claims and manage reimbursements
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceDashboardLayout>
  );
};

export default ReimbursementsPage;
