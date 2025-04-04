
import { Clock, Calendar, CreditCard, Bell, Star } from "lucide-react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EmployeeDashboard = () => {
  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Employee Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">Today's Status</div>
                  <div className="mt-1 flex items-center">
                    <div className="text-xl font-semibold">Checked In</div>
                    <span className="ml-2 text-sm text-gray-500">9:05 AM</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Check Out
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-semibold">12</div>
                      <div className="text-xs text-gray-500">Annual</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-semibold">5</div>
                      <div className="text-xs text-gray-500">Sick</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-lg font-semibold">2</div>
                      <div className="text-xs text-gray-500">Personal</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      Apply for Leave
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Latest Payslip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-500">March 2025</div>
                  <div className="mt-1 text-xl font-semibold">$4,850.00</div>
                  <div className="mt-1 text-xs text-gray-500">Credited on April 1, 2025</div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Quarterly town hall meeting</p>
                      <p className="text-sm text-gray-500">Join us for our Q2 town hall on April 15th at 10:00 AM.</p>
                      <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">New health insurance policy</p>
                      <p className="text-sm text-gray-500">Our health insurance policy has been updated. Please review the changes.</p>
                      <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Office closed for holiday</p>
                      <p className="text-sm text-gray-500">The office will be closed on April 22nd for the national holiday.</p>
                      <p className="text-xs text-gray-400 mt-1">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-2xl font-bold">4.8/5.0</p>
                    <p className="text-sm text-gray-500">Last performance review</p>
                  </div>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical Skills</span>
                      <span>4.9/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Communication</span>
                      <span>4.7/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      View Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default EmployeeDashboard;
