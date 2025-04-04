
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock company data
const recentCompanies = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    employees: 150,
    status: "active",
    joinedDate: "2023-10-15",
    plan: "Enterprise",
  },
  {
    id: 2,
    name: "Globex Inc",
    industry: "Manufacturing",
    employees: 320,
    status: "active",
    joinedDate: "2023-11-05",
    plan: "Business",
  },
  {
    id: 3,
    name: "Initech LLC",
    industry: "Finance",
    employees: 85,
    status: "pending",
    joinedDate: "2023-12-20",
    plan: "Standard",
  },
  {
    id: 4,
    name: "Stark Industries",
    industry: "Engineering",
    employees: 250,
    status: "active",
    joinedDate: "2024-01-10",
    plan: "Enterprise",
  },
  {
    id: 5,
    name: "Wayne Enterprises",
    industry: "Conglomerate",
    employees: 430,
    status: "pending",
    joinedDate: "2024-02-18",
    plan: "Business",
  },
];

const RecentCompanies = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800";
      case "Business":
        return "bg-blue-100 text-blue-800";
      case "Standard":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Companies</h2>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" /> View All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Industry</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Joined</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell className="hidden md:table-cell">{company.industry}</TableCell>
                <TableCell>{company.employees}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className={getStatusColor(company.status)}>
                    {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(company.joinedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getPlanColor(company.plan)}>
                    {company.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Company</DropdownMenuItem>
                      <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentCompanies;
