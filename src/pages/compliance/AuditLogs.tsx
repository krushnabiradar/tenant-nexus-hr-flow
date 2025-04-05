
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Logs } from "lucide-react";

// Mock audit log data
const auditLogs = [
  {
    id: 1,
    action: "User Login",
    user: "john.doe",
    timestamp: "2025-04-05T10:15:30",
    ipAddress: "192.168.1.45",
    details: "Successful login from web application"
  },
  {
    id: 2,
    action: "Document Download",
    user: "jane.smith",
    timestamp: "2025-04-05T09:32:18",
    ipAddress: "192.168.1.67",
    details: "Downloaded financial report Q1_2025.pdf"
  },
  {
    id: 3,
    action: "Employee Record Updated",
    user: "mike.wilson",
    timestamp: "2025-04-05T09:05:44",
    ipAddress: "192.168.1.23",
    details: "Updated employee #1254 salary information"
  },
  {
    id: 4,
    action: "Permission Change",
    user: "admin",
    timestamp: "2025-04-05T08:47:12",
    ipAddress: "192.168.1.10",
    details: "Modified access rights for Finance group"
  },
  {
    id: 5,
    action: "System Setting Change",
    user: "admin",
    timestamp: "2025-04-04T17:22:54",
    ipAddress: "192.168.1.10",
    details: "Changed password policy settings"
  },
  {
    id: 6,
    action: "User Logout",
    user: "sarah.johnson",
    timestamp: "2025-04-04T16:55:30",
    ipAddress: "192.168.1.78",
    details: "User logged out from web application"
  },
  {
    id: 7,
    action: "Report Generated",
    user: "david.miller",
    timestamp: "2025-04-04T15:12:42",
    ipAddress: "192.168.1.92",
    details: "Generated compliance status report"
  },
  {
    id: 8,
    action: "Failed Login Attempt",
    user: "unknown",
    timestamp: "2025-04-04T14:05:19",
    ipAddress: "203.45.67.89",
    details: "Multiple failed login attempts for admin account"
  },
  {
    id: 9,
    action: "Data Export",
    user: "lisa.garcia",
    timestamp: "2025-04-04T11:33:27",
    ipAddress: "192.168.1.35",
    details: "Exported employee attendance data"
  },
  {
    id: 10,
    action: "API Access",
    user: "api_service",
    timestamp: "2025-04-04T10:02:15",
    ipAddress: "192.168.5.22",
    details: "Accessed employee API endpoint"
  }
];

const AuditLogsPage = () => {
  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground">System activity and user actions</p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Logs className="h-5 w-5 text-indigo-600" />
              User Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>{log.details}</TableCell>
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

export default AuditLogsPage;
