
import ComplianceDashboardLayout from "@/layouts/ComplianceDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ComplianceReportsPage = () => {
  // Mock compliance reports
  const complianceReports = [
    {
      id: 1,
      title: "GDPR Compliance Report",
      description: "Quarterly assessment of data protection and privacy compliance",
      lastUpdated: "April 1, 2025",
      status: "Complete",
    },
    {
      id: 2,
      title: "SOC2 Type II Audit Report",
      description: "Annual service organization control report",
      lastUpdated: "March 15, 2025",
      status: "In Progress",
    },
    {
      id: 3,
      title: "ISO 27001 Certification",
      description: "Information security management system certification",
      lastUpdated: "February 28, 2025",
      status: "Complete",
    },
    {
      id: 4,
      title: "PCI DSS Compliance Report",
      description: "Payment Card Industry Data Security Standard assessment",
      lastUpdated: "January 20, 2025",
      status: "Complete",
    },
    {
      id: 5,
      title: "HIPAA Compliance Audit",
      description: "Health Insurance Portability and Accountability Act assessment",
      lastUpdated: "December 10, 2024",
      status: "Complete",
    },
    {
      id: 6,
      title: "Internal Security Audit Report",
      description: "Quarterly internal security controls assessment",
      lastUpdated: "March 31, 2025",
      status: "Review",
    },
  ];

  // Function to determine status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ComplianceDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Compliance Reports</h2>
          <p className="text-muted-foreground">Regulatory and security compliance documentation</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {complianceReports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  {report.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last updated: {report.lastUpdated}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ComplianceDashboardLayout>
  );
};

export default ComplianceReportsPage;
