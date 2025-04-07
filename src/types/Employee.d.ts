
interface Employee {
  id: string;
  _id?: string;
  tenantId: string | Tenant;
  userId: string | User;
  jobTitle: string;
  department: string;
  managerId?: string | Employee;
  salary: number;
  payrollId?: string | Payroll;
  employmentStatus: 'Active' | 'On Leave' | 'Resigned' | 'Terminated';
  joinDate: string | Date;
  exitDate?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}
