
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, AlertTriangle, Lock, Users, KeyRound, Bell } from "lucide-react";

const SecurityPage = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [passwordLength, setPasswordLength] = useState(12);

  const handleMfaToggle = () => {
    setMfaEnabled(!mfaEnabled);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Security Center</h2>
            <p className="text-muted-foreground">
              Monitor and manage platform security and data protection measures.
            </p>
          </div>
        </div>
        
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Security Notice</AlertTitle>
          <AlertDescription>
            Changes to security settings can impact all users across the platform. Review carefully before saving.
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="authentication">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="access-control">Access Control</TabsTrigger>
            <TabsTrigger value="auditing">Auditing & Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="authentication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Factor Authentication</CardTitle>
                <CardDescription>
                  Configure multi-factor authentication requirements for all users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require MFA for all users</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, all users must set up MFA during their next login.
                    </p>
                  </div>
                  <Switch checked={mfaEnabled} onCheckedChange={handleMfaToggle} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Users will be automatically logged out after this period of inactivity.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={passwordExpiry}
                    onChange={(e) => setPasswordExpiry(parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Users will be required to change their password after this many days.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-length">Minimum Password Length</Label>
                  <Input
                    id="password-length"
                    type="number"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="access-control" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Control</CardTitle>
                <CardDescription>
                  Manage roles and permissions across the platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-16 text-center">
                <div className="space-y-2">
                  <Users className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium">Role Management</h3>
                  <p className="text-muted-foreground">
                    Configure roles and assign granular permissions to each role.
                  </p>
                  <Button className="mt-4">Configure Roles</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="auditing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Audit Logs</CardTitle>
                <CardDescription>
                  View and export security-related activity logs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-16 text-center">
                <div className="space-y-2">
                  <Lock className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium">Security Logs</h3>
                  <p className="text-muted-foreground">
                    View detailed logs of security events and user activities.
                  </p>
                  <Button className="mt-4">View Audit Logs</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </DashboardLayout>
  );
};

export default SecurityPage;
