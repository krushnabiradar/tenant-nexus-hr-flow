
interface Payroll {
  id: string;
  _id?: string;
  tenantId: string | Tenant;
  employeeId: string | Employee;
  salary: number;
  tax: number;
  deductions: number;
  netPay: number;
  month: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  transactionId?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
