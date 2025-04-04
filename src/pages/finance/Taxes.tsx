
import FinanceDashboardLayout from "@/layouts/FinanceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const TaxesPage = () => {
  return (
    <FinanceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Tax Management</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              Generate Reports
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export Tax Data
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Income Tax Withheld</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$28,450</div>
              <p className="text-xs text-muted-foreground">Current fiscal quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Social Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,350</div>
              <p className="text-xs text-muted-foreground">Current fiscal quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Medicare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$8,750</div>
              <p className="text-xs text-muted-foreground">Current fiscal quarter</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tax Deduction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tax Type</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead className="text-right">YTD Total</TableHead>
                  <TableHead className="text-right">Last Pay Period</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Federal Income Tax</TableCell>
                  <TableCell>Varied</TableCell>
                  <TableCell className="text-right">$124,856</TableCell>
                  <TableCell className="text-right">$28,450</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>State Income Tax</TableCell>
                  <TableCell>5.75%</TableCell>
                  <TableCell className="text-right">$45,322</TableCell>
                  <TableCell className="text-right">$9,236</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Social Security</TableCell>
                  <TableCell>6.2%</TableCell>
                  <TableCell className="text-right">$52,967</TableCell>
                  <TableCell className="text-right">$12,350</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medicare</TableCell>
                  <TableCell>1.45%</TableCell>
                  <TableCell className="text-right">$36,412</TableCell>
                  <TableCell className="text-right">$8,750</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>401(k) Contributions</TableCell>
                  <TableCell>Varied</TableCell>
                  <TableCell className="text-right">$85,236</TableCell>
                  <TableCell className="text-right">$19,450</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Filing Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-3 rounded-md">
                <div>
                  <h4 className="font-medium">Quarterly Federal Tax Return</h4>
                  <p className="text-sm text-muted-foreground">Form 941 due in 12 days</p>
                </div>
                <Button variant="outline">Start Filing</Button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-md">
                <div>
                  <h4 className="font-medium">State Unemployment Tax</h4>
                  <p className="text-sm text-muted-foreground">Due April 30, 2025</p>
                </div>
                <Button variant="outline">Start Filing</Button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-md">
                <div>
                  <h4 className="font-medium">W-2 Annual Filing</h4>
                  <p className="text-sm text-muted-foreground">Due January 31, 2026</p>
                </div>
                <Button variant="outline" disabled>Not Yet Available</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FinanceDashboardLayout>
  );
};

export default TaxesPage;
