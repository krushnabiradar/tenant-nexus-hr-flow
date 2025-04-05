
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const ComplianceSettingsPage = () => {
  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Compliance Settings</h2>
          <p className="text-muted-foreground">Configure system compliance settings</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <Settings className="h-16 w-16 mx-auto text-indigo-500 mb-3" />
              <p className="text-muted-foreground">Compliance settings will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Configure security policies, audit settings, and compliance rules
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComplianceDashboardLayout>
  );
};

export default ComplianceSettingsPage;
