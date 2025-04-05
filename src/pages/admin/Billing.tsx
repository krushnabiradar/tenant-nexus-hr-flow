
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const BillingPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Billing Management</h2>
        <p className="text-muted-foreground">
          Manage billing, subscriptions, and payments for tenant companies.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Billing Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Payment Management</h3>
              <p className="text-muted-foreground">
                View and manage tenant subscriptions and billing status.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
