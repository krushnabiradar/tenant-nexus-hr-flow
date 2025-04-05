
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield } from "lucide-react";

// Mock security log data
const securityLogs = [
  {
    id: 1,
    eventType: "Authentication Failure",
    severity: "High",
    source: "192.168.1.34",
    timestamp: "2025-04-05T10:23:15",
    description: "Multiple failed login attempts for user admin",
  },
  {
    id: 2,
    eventType: "Privilege Escalation",
    severity: "Critical",
    source: "Internal System",
    timestamp: "2025-04-05T09:12:43",
    description: "Unauthorized privilege escalation attempt detected",
  },
  {
    id: 3,
    eventType: "Firewall Alert",
    severity: "Medium",
    source: "Network Gateway",
    timestamp: "2025-04-05T08:34:22",
    description: "Unusual outbound traffic pattern detected",
  },
  {
    id: 4,
    eventType: "System Update",
    severity: "Low",
    source: "Update Server",
    timestamp: "2025-04-05T07:30:00",
    description: "Security patches applied successfully",
  },
  {
    id: 5,
    eventType: "Data Access",
    severity: "Medium",
    source: "Internal User (jsmith)",
    timestamp: "2025-04-04T23:52:11",
    description: "Unusual access pattern to sensitive customer data",
  },
  {
    id: 6,
    eventType: "Security Scan",
    severity: "Low",
    source: "Security Scanner",
    timestamp: "2025-04-04T22:00:00",
    description: "Scheduled security vulnerability scan completed",
  },
  {
    id: 7,
    eventType: "Configuration Change",
    severity: "Medium",
    source: "Admin User",
    timestamp: "2025-04-04T18:12:45",
    description: "Firewall rule configuration changed",
  },
];

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium";
    case "High":
      return "text-orange-700 bg-orange-100 px-2 py-1 rounded-full text-xs font-medium";
    case "Medium":
      return "text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs font-medium";
    case "Low":
      return "text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium";
    default:
      return "text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium";
  }
};

const SecurityLogsPage = () => {
  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Security Logs</h2>
          <p className="text-muted-foreground">System security events and alerts</p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Security Event Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.eventType}</TableCell>
                      <TableCell>
                        <span className={getSeverityClass(log.severity)}>
                          {log.severity}
                        </span>
                      </TableCell>
                      <TableCell>{log.source}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComplianceDashboardLayout>
  );
};

export default SecurityLogsPage;
