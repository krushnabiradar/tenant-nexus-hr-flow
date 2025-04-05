
import ManagerDashboardLayout from "@/layouts/ManagerDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LeaveRequestsPage = () => {
  // Sample data for leave requests
  const leaveRequests = [
    { 
      id: "LR001",
      employee: "James Wilson", 
      type: "Sick Leave", 
      duration: "2 days", 
      from: "Apr 5, 2025", 
      to: "Apr 6, 2025",
      reason: "Medical appointment and recovery",
      status: "Pending" 
    },
    { 
      id: "LR002",
      employee: "Sarah Lee", 
      type: "Vacation", 
      duration: "1 week", 
      from: "Apr 10, 2025", 
      to: "Apr 17, 2025",
      reason: "Family trip",
      status: "Pending" 
    },
    { 
      id: "LR003",
      employee: "Alex Johnson", 
      type: "Personal Leave", 
      duration: "1 day", 
      from: "Apr 8, 2025", 
      to: "Apr 8, 2025",
      reason: "Family emergency",
      status: "Approved" 
    },
    { 
      id: "LR004",
      employee: "Maria Garcia", 
      type: "Work From Home", 
      duration: "3 days", 
      from: "Apr 12, 2025", 
      to: "Apr 14, 2025",
      reason: "Home repair appointments",
      status: "Approved" 
    },
    { 
      id: "LR005",
      employee: "James Wilson", 
      type: "Vacation", 
      duration: "3 days", 
      from: "Apr 20, 2025", 
      to: "Apr 22, 2025",
      reason: "Short getaway",
      status: "Rejected" 
    },
  ];

  const pendingRequests = leaveRequests.filter(req => req.status === "Pending");
  const approvedRequests = leaveRequests.filter(req => req.status === "Approved");
  const rejectedRequests = leaveRequests.filter(req => req.status === "Rejected");

  return (
    <ManagerDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Leave Requests</h2>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Badge className="bg-yellow-100 text-yellow-700">
              {pendingRequests.length} Pending
            </Badge>
            <Badge className="bg-green-100 text-green-700">
              {approvedRequests.length} Approved
            </Badge>
            <Badge className="bg-red-100 text-red-700">
              {rejectedRequests.length} Rejected
            </Badge>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingRequests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.employee}</p>
                          <p className="text-xs text-muted-foreground">Request ID: {request.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                          {request.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{request.duration}</p>
                          <p className="text-xs text-muted-foreground">{request.from} - {request.to}</p>
                        </div>
                      </TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground opacity-20 mb-2" />
                <p className="text-muted-foreground">No pending leave requests</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...approvedRequests, ...rejectedRequests].slice(0, 5).map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.employee}</p>
                        <p className="text-xs text-muted-foreground">{request.from} - {request.to}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        {request.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.duration}</TableCell>
                    <TableCell>
                      {request.status === "Approved" ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Approved
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Leave Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center py-10">
              <Calendar className="h-16 w-16 mx-auto text-amber-500 mb-3" />
              <p className="text-muted-foreground">Leave calendar view will be implemented here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Shows all approved team leaves on a monthly calendar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerDashboardLayout>
  );
};

export default LeaveRequestsPage;
