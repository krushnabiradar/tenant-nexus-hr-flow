
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";

// Mock user access data
const userAccessData = [
  {
    id: 1,
    username: "john.doe",
    fullName: "John Doe",
    role: "Finance Manager",
    accessLevel: "Department",
    lastAccess: "2025-04-05T09:15:22",
    status: "Active",
  },
  {
    id: 2,
    username: "jane.smith",
    fullName: "Jane Smith",
    role: "HR Director",
    accessLevel: "Administrative",
    lastAccess: "2025-04-05T08:45:10",
    status: "Active",
  },
  {
    id: 3,
    username: "mike.wilson",
    fullName: "Mike Wilson",
    role: "IT Administrator",
    accessLevel: "System",
    lastAccess: "2025-04-05T10:30:45",
    status: "Active",
  },
  {
    id: 4,
    username: "sarah.johnson",
    fullName: "Sarah Johnson",
    role: "Payroll Specialist",
    accessLevel: "Department",
    lastAccess: "2025-04-04T16:20:33",
    status: "Active",
  },
  {
    id: 5,
    username: "robert.brown",
    fullName: "Robert Brown",
    role: "Sales Manager",
    accessLevel: "Department",
    lastAccess: "2025-04-03T14:50:12",
    status: "Inactive",
  },
  {
    id: 6,
    username: "lisa.garcia",
    fullName: "Lisa Garcia",
    role: "Compliance Officer",
    accessLevel: "Administrative",
    lastAccess: "2025-04-05T07:25:18",
    status: "Active",
  },
  {
    id: 7,
    username: "david.miller",
    fullName: "David Miller",
    role: "Customer Support",
    accessLevel: "Standard",
    lastAccess: "2025-04-04T11:10:05",
    status: "Locked",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium";
    case "Inactive":
      return "text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium";
    case "Locked":
      return "text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium";
    default:
      return "text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium";
  }
};

const UserAccessPage = () => {
  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">User Access Control</h2>
          <p className="text-muted-foreground">Manage employee system access</p>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              User Access Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Last Access</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userAccessData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.accessLevel}</TableCell>
                      <TableCell>{new Date(user.lastAccess).toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={getStatusClass(user.status)}>
                          {user.status}
                        </span>
                      </TableCell>
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

export default UserAccessPage;
