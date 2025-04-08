
import { useState, useEffect } from "react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Download, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { employeeApi } from "@/services/employee.api";

const PayslipsPage = () => {
  const [payslips, setPayslips] = useState<any[]>([]);
  const [currentPayslip, setCurrentPayslip] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPayslips = async () => {
      setIsLoading(true);
      try {
        const response = await employeeApi.getPayslips();
        setPayslips(response.payslips || []);
        if (response.payslips && response.payslips.length > 0) {
          setCurrentPayslip(response.payslips[0]);
        }
      } catch (error) {
        console.error("Error fetching payslips:", error);
        toast({
          title: "Error",
          description: "Failed to fetch payroll data",
          variant: "destructive"
        });
        
        // Use mock data as fallback if API is not ready
        const mockPayslips = [
          { id: 1, month: "March 2025", amount: "$4,850.00", date: "April 1, 2025" },
          { id: 2, month: "February 2025", amount: "$4,850.00", date: "March 1, 2025" },
          { id: 3, month: "January 2025", amount: "$4,850.00", date: "February 1, 2025" },
          { id: 4, month: "December 2024", amount: "$4,700.00", date: "January 1, 2025" },
          { id: 5, month: "November 2024", amount: "$4,700.00", date: "December 1, 2024" },
          { id: 6, month: "October 2024", amount: "$4,700.00", date: "November 1, 2024" },
        ];
        
        setPayslips(mockPayslips);
        setCurrentPayslip(mockPayslips[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayslips();
  }, [toast]);

  const handleViewPayslip = (payslip: any) => {
    setCurrentPayslip(payslip);
    toast({
      title: "Viewing Payslip",
      description: `Viewing payslip for ${payslip.month}`
    });
  };

  const handleDownloadPayslip = (payslip: any) => {
    // This would be an actual download request in a real app
    toast({
      title: "Download Started",
      description: `Downloading payslip for ${payslip.month}`
    });
  };

  return (
    <EmployeeDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Payslips & Salary</h2>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Salary Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <div className="lg:w-1/3 mb-6 lg:mb-0 flex flex-col items-center justify-center">
                <div className="bg-purple-100 p-3 rounded-full mb-4">
                  <CreditCard className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-1">
                    {currentPayslip?.totalSalary || currentPayslip?.amount || "$4,850.00"}
                  </h3>
                  <p className="text-sm text-gray-500">Monthly Net Salary</p>
                </div>
              </div>
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Basic Salary</p>
                  <p className="text-xl font-semibold">{currentPayslip?.basicSalary || "$4,000.00"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Housing Allowance</p>
                  <p className="text-xl font-semibold">{currentPayslip?.housingAllowance || "$800.00"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Transportation Allowance</p>
                  <p className="text-xl font-semibold">{currentPayslip?.transportAllowance || "$200.00"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Tax Deductions</p>
                  <p className="text-xl font-semibold">{currentPayslip?.taxDeductions || "-$150.00"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payslip History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center">
                <p>Loading payslips...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Date
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payslips.map((payslip) => (
                      <tr key={payslip.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          {payslip.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payslip.amount || payslip.totalSalary}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payslip.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mr-2"
                            onClick={() => handleViewPayslip(payslip)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadPayslip(payslip)}
                          >
                            <Download className="h-4 w-4 mr-1" /> Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </EmployeeDashboardLayout>
  );
};

export default PayslipsPage;
