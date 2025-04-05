
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const OffersPage = () => {
  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Offer Letters</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Offer Management</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Offer Letter System</h3>
              <p className="text-muted-foreground">
                Create, manage, and track offer letters for candidates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default OffersPage;
