
interface User {
  id: string;
  _id?: string;
  tenantId?: string | Tenant;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'company' | 'employee' | 'manager' | 'finance' | 'compliance' | 'recruitment';
  permissions: string[];
  employeeProfile?: string | Employee;
  status: 'Active' | 'Inactive';
  createdAt: string | Date;
  updatedAt: string | Date;
}
