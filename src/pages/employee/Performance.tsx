
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, MessageSquare, Target } from "lucide-react";

const PerformancePage = () => {
  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Performance Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Overall Rating</p>
                  <p className="text-2xl font-bold">4.8/5.0</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Goals Completed</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Growth Trend</p>
                  <p className="text-2xl font-bold">Positive</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Latest Performance Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Q1 2025 Performance Review</h3>
                    <p className="text-sm text-gray-500">Completed on March 15, 2025</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technical Skills</span>
                      <span>4.9/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Communication</span>
                      <span>4.7/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Problem Solving</span>
                      <span>4.8/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Team Collaboration</span>
                      <span>4.6/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Initiative</span>
                      <span>4.5/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Manager's Feedback</h4>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                    <span className="font-medium text-sm">JW</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex-1">
                    <p className="text-sm text-gray-800">
                      John has been an exceptional team member this quarter. His technical expertise and problem-solving abilities have been instrumental in the successful delivery of the authentication system project. He consistently meets deadlines and produces high-quality work. Moving forward, I'd like to see John take on more mentoring responsibilities to share his knowledge with junior team members.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Jane Wilson, Engineering Manager</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-md font-medium mb-2">Add Your Feedback</h4>
                  <div className="bg-gray-50 p-4 rounded-lg flex">
                    <textarea 
                      className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 resize-none" 
                      placeholder="Share your thoughts on this performance review..."
                      rows={3}
                    ></textarea>
                    <button className="ml-2 p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 self-end">
                      <MessageSquare className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-1/5 text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <span className="font-medium text-sm text-blue-600">Q4</span>
                  </div>
                  <p className="text-xs mt-1">2024</p>
                </div>
                <div className="w-4/5 h-2 bg-gray-200 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="ml-4">
                  <span className="font-medium">4.6</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/5 text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <span className="font-medium text-sm text-blue-600">Q3</span>
                  </div>
                  <p className="text-xs mt-1">2024</p>
                </div>
                <div className="w-4/5 h-2 bg-gray-200 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="ml-4">
                  <span className="font-medium">4.4</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/5 text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <span className="font-medium text-sm text-blue-600">Q2</span>
                  </div>
                  <p className="text-xs mt-1">2024</p>
                </div>
                <div className="w-4/5 h-2 bg-gray-200 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
                <div className="ml-4">
                  <span className="font-medium">4.2</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-1/5 text-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <span className="font-medium text-sm text-blue-600">Q1</span>
                  </div>
                  <p className="text-xs mt-1">2024</p>
                </div>
                <div className="w-4/5 h-2 bg-gray-200 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="ml-4">
                  <span className="font-medium">4.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default PerformancePage;
