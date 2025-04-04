
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const CompliancePage = () => {
  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Compliance & Documents</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Management</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Document System</h3>
              <p className="text-muted-foreground">
                Manage company documents, policies, and compliance requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyDashboardLayout>
  );
};

export default CompliancePage;
