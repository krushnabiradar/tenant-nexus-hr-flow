
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const SecurityPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Security Center</h2>
        <p className="text-muted-foreground">
          Monitor and manage platform security and data protection measures.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Shield className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Security Controls</h3>
              <p className="text-muted-foreground">
                Platform-wide security settings and audit tools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SecurityPage;
