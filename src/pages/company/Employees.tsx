
import { useState } from "react";
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

const EmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample employee data
  const employees = [
    { id: 1, name: "John Smith", position: "Senior Developer", department: "Engineering", status: "Active" },
    { id: 2, name: "Sarah Johnson", position: "Senior Developer", department: "Engineering", status: "Active" },
    { id: 3, name: "Michael Brown", position: "UI/UX Designer", department: "Design", status: "On Leave" },
    { id: 4, name: "Emily Davis", position: "HR Specialist", department: "Human Resources", status: "Active" },
    { id: 5, name: "Robert Wilson", position: "Product Manager", department: "Product", status: "Active" },
    { id: 6, name: "Jennifer Taylor", position: "Marketing Specialist", department: "Marketing", status: "Active" },
    { id: 7, name: "David Miller", position: "Financial Analyst", department: "Finance", status: "Active" },
    { id: 8, name: "Lisa Anderson", position: "QA Engineer", department: "Engineering", status: "Active" },
  ];

  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Employee Directory</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-8 pr-4 py-2 border rounded-md w-full md:w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === "Active" ? "bg-green-100 text-green-800" : 
                      employee.status === "On Leave" ? "bg-amber-100 text-amber-800" : 
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </CompanyDashboardLayout>
  );
};

export default EmployeesPage;
