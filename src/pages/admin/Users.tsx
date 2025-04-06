
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, UserPlus, Users } from "lucide-react";

// Dummy user data
const dummyUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc",
    role: "Admin",
    status: "Active"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    company: "Globex Corp",
    role: "HR Manager",
    status: "Active"
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    company: "Initech",
    role: "Employee",
    status: "Active"
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    company: "Massive Dynamic",
    role: "Manager",
    status: "Inactive"
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    company: "Stark Industries",
    role: "HR Manager",
    status: "Active"
  }
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground">
              Manage all system users across tenant companies.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "outline"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
