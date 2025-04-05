
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Configure and customize system-wide settings and defaults.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Configuration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Settings className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Global Settings</h3>
              <p className="text-muted-foreground">
                Manage platform-wide configurations and preferences.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
