
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const PayrollPage = () => {
  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Payroll Management</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Payroll Processing</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Payroll System</h3>
              <p className="text-muted-foreground">
                Process payroll, manage compensation, and generate pay slips.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyDashboardLayout>
  );
};

export default PayrollPage;
