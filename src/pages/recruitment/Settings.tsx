
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recruitment Settings</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings & Configuration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Settings className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Settings Panel</h3>
              <p className="text-muted-foreground">
                Configure job templates, workflow settings, and user permissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default SettingsPage;
