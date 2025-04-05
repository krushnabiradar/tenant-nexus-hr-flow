
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, PlusCircle } from "lucide-react";
import { authService } from "@/services/api";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Fetch users data
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: authService.getCurrentUser,
    retry: 1
  });

  // Filter users based on search term and role filter
  const filteredUsers = users ? users.filter((user: any) => {
    const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter ? user.role === roleFilter : true;
    
    return (nameMatch || emailMatch) && roleMatch;
  }) : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
            <p className="text-muted-foreground">
              Manage all system users across tenant companies.
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  <SelectItem value="SuperAdmin">Super Admin</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <p>Loading users...</p>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <Users className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium">Error Loading Users</h3>
                  <p className="text-muted-foreground">
                    There was an error loading the user list.
                  </p>
                </div>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tenant</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user: any) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "success" : "destructive"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.tenantId ? user.tenantId : "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8 text-center">
                <div className="space-y-2">
                  <Users className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-lg font-medium">No Users Found</h3>
                  <p className="text-muted-foreground">
                    No users match your search criteria.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
