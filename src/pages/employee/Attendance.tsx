
import { useEffect, useState } from "react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { attendanceAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const AttendancePage = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  // Mock user ID until we have auth integration
  const mockEmployeeId = "6405fb8eff01b05ce5baa8a4"; // This would come from auth context in a real app

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, this would come from your auth context
        setCurrentUser({ id: mockEmployeeId });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive"
        });
      }
    };

    fetchUserData();
  }, [toast]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!currentUser?.id) return;

      setIsLoading(true);
      try {
        // Fetch today's attendance to check if the user is already checked in
        const today = new Date();
        const formattedDate = format(today, "yyyy-MM-dd");
        const response = await attendanceAPI.getAllAttendance({
          employeeId: currentUser.id,
          date: formattedDate
        });

        if (response && response.length > 0) {
          const todayRecord = response[0];
          setIsCheckedIn(!!todayRecord.clockIn && !todayRecord.clockOut);
          if (todayRecord.clockIn) {
            setCheckInTime(format(new Date(todayRecord.clockIn), "h:mm a"));
          }
        } else {
          setIsCheckedIn(false);
          setCheckInTime(null);
        }

        // Fetch attendance history
        const historyResponse = await attendanceAPI.getAllAttendance({
          employeeId: currentUser.id
        });
        setAttendanceRecords(historyResponse || []);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch attendance data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendanceData();
  }, [currentUser, toast]);

  const handleCheckInOut = async () => {
    if (!currentUser?.id) {
      toast({
        title: "Error",
        description: "User data is not available",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isCheckedIn) {
        // Clock out
        await attendanceAPI.clockOut({ employeeId: currentUser.id });
        setIsCheckedIn(false);
        toast({
          title: "Success",
          description: "You have successfully checked out"
        });
      } else {
        // Clock in
        const response = await attendanceAPI.clockIn({ 
          employeeId: currentUser.id,
          tenantId: "your-tenant-id" // This would come from auth context in a real app
        });
        setIsCheckedIn(true);
        setCheckInTime(format(new Date(response.clockIn), "h:mm a"));
        toast({
          title: "Success",
          description: "You have successfully checked in"
        });
      }

      // Refresh attendance records
      const historyResponse = await attendanceAPI.getAllAttendance({
        employeeId: currentUser.id
      });
      setAttendanceRecords(historyResponse || []);
    } catch (error) {
      console.error("Error during check in/out:", error);
      toast({
        title: "Error",
        description: `Failed to ${isCheckedIn ? "check out" : "check in"}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAttendanceStatus = (record: any) => {
    if (!record.clockIn) return "Absent";
    if (record.clockIn && !record.clockOut) return "In Progress";
    return "Complete";
  };

  const formatDuration = (record: any) => {
    if (!record.clockIn) return "--";
    if (!record.clockOut) return "--";
    return `${record.hoursWorked || 0}h ${Math.round((record.hoursWorked % 1) * 60) || 0}m`;
  };

  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Attendance Tracking</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-2xl font-bold mb-2">
                  {isCheckedIn ? "Checked In" : "Checked Out"}
                </p>
                <p className="text-gray-500 mb-6">
                  {isCheckedIn && checkInTime ? `Since ${checkInTime}` : "Have a great day!"}
                </p>
                <Button 
                  onClick={handleCheckInOut} 
                  className={isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : (isCheckedIn ? "Check Out" : "Check In")}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length > 0 ? (
                <div className="space-y-4">
                  {attendanceRecords.slice(0, 4).map((record, index) => (
                    <div key={record._id || index} className="flex items-center justify-between pb-2 border-b">
                      <div>
                        <p className="font-medium">
                          {format(new Date(record.date), "EEEE, MMM d")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {record.clockIn ? format(new Date(record.clockIn), "h:mm a") : "--"} - 
                          {record.clockOut ? format(new Date(record.clockOut), "h:mm a") : "--"}
                        </p>
                      </div>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${
                        !record.clockOut ? "text-blue-600 bg-blue-50" : "text-green-600 bg-green-50"
                      }`}>
                        {formatDuration(record)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No attendance records found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check In
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                    </tr>
                  ) : attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record, index) => (
                      <tr key={record._id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {format(new Date(record.date), "EEE, MMM d")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.clockIn ? format(new Date(record.clockIn), "h:mm a") : "--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.clockOut ? format(new Date(record.clockOut), "h:mm a") : "--"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDuration(record)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            !record.clockOut && record.clockIn ? "bg-blue-100 text-blue-800" : 
                            !record.clockIn ? "bg-red-100 text-red-800" : 
                            "bg-green-100 text-green-800"
                          }`}>
                            {formatAttendanceStatus(record)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">No attendance records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default AttendancePage;
