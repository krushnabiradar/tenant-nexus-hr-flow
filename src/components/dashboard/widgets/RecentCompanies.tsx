
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Users } from "lucide-react";

interface Company {
  id: string | number;
  name: string;
  industry: string;
  employees: number;
  subscription: string;
  joined: string;
}

interface RecentCompaniesProps {
  companies?: Company[];
}

const RecentCompanies = ({ companies }: RecentCompaniesProps) => {
  // Default companies if none are provided from API
  const recentCompanies = companies || [
    {
      id: 1,
      name: "Acme Corporation",
      industry: "Technology",
      employees: 120,
      subscription: "Enterprise",
      joined: "Apr 1, 2025"
    },
    {
      id: 2,
      name: "Globex Industries",
      industry: "Manufacturing",
      employees: 85,
      subscription: "Professional",
      joined: "Mar 28, 2025"
    },
    {
      id: 3,
      name: "Stark Enterprises",
      industry: "Research",
      employees: 250,
      subscription: "Enterprise",
      joined: "Mar 15, 2025"
    },
    {
      id: 4,
      name: "Wayne Enterprises",
      industry: "Logistics",
      employees: 112,
      subscription: "Professional",
      joined: "Mar 10, 2025"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Added Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Industry
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Employees
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCompanies.map((company) => (
                <tr key={company.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                    <Building className="h-5 w-5 text-gray-400 mr-2" />
                    {company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {company.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      {company.employees}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.subscription === "Enterprise" 
                        ? "bg-purple-100 text-purple-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {company.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      {company.joined}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentCompanies;
