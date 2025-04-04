
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const JobsPage = () => {
  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recruitment Management</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Postings</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Briefcase className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Recruitment System</h3>
              <p className="text-muted-foreground">
                Create job postings, track applicants, and manage the hiring process.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanyDashboardLayout>
  );
};

export default JobsPage;
