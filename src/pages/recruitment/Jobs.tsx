
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const JobsPage = () => {
  const jobListings = [
    { id: "JOB001", title: "Senior Frontend Developer", department: "Engineering", location: "Remote", applicants: 24, status: "Active" },
    { id: "JOB002", title: "UX/UI Designer", department: "Design", location: "New York", applicants: 18, status: "Active" },
    { id: "JOB003", title: "Product Manager", department: "Product", location: "San Francisco", applicants: 32, status: "Active" },
    { id: "JOB004", title: "DevOps Engineer", department: "Engineering", location: "Remote", applicants: 9, status: "Active" },
    { id: "JOB005", title: "Marketing Specialist", department: "Marketing", location: "Chicago", applicants: 15, status: "Closed" },
    { id: "JOB006", title: "HR Coordinator", department: "Human Resources", location: "Austin", applicants: 21, status: "Draft" },
    { id: "JOB007", title: "Data Analyst", department: "Analytics", location: "Boston", applicants: 12, status: "Active" },
  ];

  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Job Listings</h2>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Add New Job
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Manage Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search jobs..." 
                  className="pl-9"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden md:table-cell">Location</TableHead>
                    <TableHead className="hidden sm:table-cell">Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobListings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{job.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                      <TableCell className="hidden sm:table-cell">{job.applicants}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            job.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                            'bg-red-100 text-red-800'}`
                        }>
                          {job.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default JobsPage;
