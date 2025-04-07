
interface User {
  id: string;
  _id?: string;
  tenantId?: string | Tenant;
  name: string;
  email: string;
  password?: string;
  role: 'SuperAdmin' | 'HR' | 'Manager' | 'Employee';
  permissions: string[];
  employeeProfile?: string | Employee;
  status: 'Active' | 'Inactive';
  createdAt: string | Date;
  updatedAt: string | Date;
}
