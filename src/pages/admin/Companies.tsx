
import DashboardLayout from "@/layouts/DashboardLayout";

const CompaniesPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Companies Management</h2>
        <p className="text-muted-foreground">
          Manage all tenant companies from this dashboard.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default CompaniesPage;
