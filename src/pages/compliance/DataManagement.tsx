
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

const DataManagementPage = () => {
  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Data Management</h2>
          <p className="text-muted-foreground">Data retention and classification</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Management Console</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 text-center">
              <Database className="h-16 w-16 mx-auto text-indigo-500 mb-3" />
              <p className="text-muted-foreground">Data management tools will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Manage data retention policies, classification, and protection measures
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComplianceDashboardLayout>
  );
};

export default DataManagementPage;
