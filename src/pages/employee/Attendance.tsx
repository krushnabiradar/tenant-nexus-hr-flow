
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useState } from "react";

const AttendancePage = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState("9:05 AM");
  
  const handleCheckInOut = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
    } else {
      setIsCheckedIn(true);
      // This would normally set the current time
      setCheckInTime("9:05 AM");
    }
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
                  {isCheckedIn ? `Since ${checkInTime}` : "Have a great day!"}
                </p>
                <Button 
                  onClick={handleCheckInOut} 
                  className={isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                >
                  {isCheckedIn ? "Check Out" : "Check In"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Monday, Apr 1</p>
                    <p className="text-sm text-gray-500">9:02 AM - 5:15 PM</p>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    8h 13m
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Tuesday, Apr 2</p>
                    <p className="text-sm text-gray-500">8:55 AM - 5:05 PM</p>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    8h 10m
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Wednesday, Apr 3</p>
                    <p className="text-sm text-gray-500">9:10 AM - 5:30 PM</p>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    8h 20m
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <p className="font-medium">Thursday, Apr 4</p>
                    <p className="text-sm text-gray-500">9:05 AM - Present</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    In Progress
                  </span>
                </div>
              </div>
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
                  {[...Array(10)].map((_, i) => {
                    const date = new Date(2025, 3, 4 - i);
                    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                    const isToday = i === 0;
                    
                    return (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {dateStr}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {isToday ? "9:05 AM" : "9:00 AM"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {isToday ? "--" : "5:00 PM"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {isToday ? "--" : "8h 00m"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            isToday ? "bg-blue-100 text-blue-800" : 
                            i === 5 || i === 6 ? "bg-gray-100 text-gray-800" : 
                            "bg-green-100 text-green-800"
                          }`}>
                            {isToday ? "In Progress" : 
                             i === 5 || i === 6 ? "Weekend" : 
                             "Complete"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
