
import FinanceDashboardLayout from "@/layouts/FinanceDashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowUpDown, Download, Plus } from "lucide-react";

const PayrollPage = () => {
  const payrollCycles = [
    { id: 1, period: "April 1-15, 2025", status: "Completed", employees: 236, total: "$64,250", processed: "Apr 15, 2025" },
    { id: 2, period: "April 16-30, 2025", status: "Processing", employees: 236, total: "$64,200", processed: "Apr 30, 2025" },
    { id: 3, period: "May 1-15, 2025", status: "Scheduled", employees: 236, total: "$64,350", processed: "May 15, 2025" },
    { id: 4, period: "May 16-31, 2025", status: "Scheduled", employees: 236, total: "$64,350", processed: "May 31, 2025" },
  ];

  return (
    <FinanceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Payroll Processing</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              New Payroll Run
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payroll Cycles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Employees</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-right">Processing Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollCycles.map((cycle) => (
                  <TableRow key={cycle.id}>
                    <TableCell className="font-medium">{cycle.period}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${cycle.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                          cycle.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'}`
                      }>
                        {cycle.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{cycle.employees}</TableCell>
                    <TableCell className="text-right">{cycle.total}</TableCell>
                    <TableCell className="text-right">{cycle.processed}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Salary Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Processed</span>
                  <span className="font-medium">216/236</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-sm">Review overtime hours</span>
                  <Button variant="outline" size="sm">Review</Button>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm">Approve bonus payouts</span>
                  <Button variant="outline" size="sm">Approve</Button>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm">Verify tax calculations</span>
                  <Button variant="outline" size="sm">Verify</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </FinanceDashboardLayout>
  );
};

export default PayrollPage;
