
interface User {
  id: string;
  _id?: string;
  tenantId: string | Tenant;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'HR' | 'Manager' | 'Employee';
  permissions: string[];
  employeeProfile?: string;
  status: 'Active' | 'Inactive';
  createdAt: string | Date;
  updatedAt: string | Date;
}
