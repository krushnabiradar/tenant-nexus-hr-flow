
import { useState, useEffect } from "react";
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Clock } from "lucide-react";
import { complianceApi } from "@/services/compliance.api";
import { useToast } from "@/hooks/use-toast";

const ComplianceDashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await complianceApi.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch compliance dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <ComplianceDashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-500">Loading dashboard data...</p>
        </div>
      </ComplianceDashboardLayout>
    );
  }

  const stats = dashboardData?.stats || {
    securityAlerts: { value: "12", info: "3 critical alerts requiring attention" },
    activeUsers: { value: "843", change: "+2.5% from last month" },
    complianceStatus: { value: "94%", info: "GDPR, SOC2, ISO 27001 compliant" },
    auditActivities: { value: "156", info: "Activities in the last 24 hours" }
  };

  const securityLogs = dashboardData?.securityLogs || [
    { id: 1, severity: "high", message: "Failed login attempts (IP: 192.168.1.34)", timestamp: "Today, 10:23 AM" },
    { id: 2, severity: "medium", message: "Password policy violation (User: jsmith)", timestamp: "Today, 9:45 AM" },
    { id: 3, severity: "low", message: "Security patch applied successfully", timestamp: "Today, 7:30 AM" },
    { id: 4, severity: "medium", message: "Unusual file access pattern detected", timestamp: "Yesterday, 11:52 PM" }
  ];

  const complianceReports = dashboardData?.complianceReports || [
    { id: 1, name: "GDPR Quarterly Report", progress: 100, status: "Complete" },
    { id: 2, name: "SOC2 Type II Audit", progress: 75, status: "In Progress" },
    { id: 3, name: "ISO 27001 Certification", progress: 100, status: "Complete" },
    { id: 4, name: "Internal Security Audit", progress: 30, status: "Upcoming" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "text-green-600";
      case "In Progress":
        return "text-indigo-600";
      case "Upcoming":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-500";
      case "In Progress":
        return "bg-indigo-600";
      case "Upcoming":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">IT & Compliance Dashboard</h2>
          <p className="text-muted-foreground">Security & Compliance Department</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <Shield className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.securityAlerts.value}</div>
              <p className="text-xs text-muted-foreground">{stats.securityAlerts.info}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.value}</div>
              <p className="text-xs text-muted-foreground">{stats.activeUsers.change}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
              <FileText className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.complianceStatus.value}</div>
              <p className="text-xs text-muted-foreground">{stats.complianceStatus.info}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Audit Activities</CardTitle>
              <Clock className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.auditActivities.value}</div>
              <p className="text-xs text-muted-foreground">{stats.auditActivities.info}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Security Logs</CardTitle>
              <CardDescription>System security events from the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4">
                    <div className={`w-2 h-2 mt-2 rounded-full ${getSeverityColor(log.severity)}`}></div>
                    <div>
                      <p className="text-sm font-medium">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Compliance Reports Status</CardTitle>
              <CardDescription>Status of required compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{report.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressBarColor(report.status)}`} 
                          style={{ width: `${report.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ComplianceDashboardLayout>
  );
};

export default ComplianceDashboard;
