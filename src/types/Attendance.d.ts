
interface Attendance {
  id: string;
  _id?: string;
  employeeId: string | Employee;
  date: string | Date;
  clockIn: string | Date;
  clockOut?: string | Date;
  status?: 'Present' | 'Absent' | 'On Leave' | 'Late';
  hoursWorked?: number;
  overtimeHours?: number;
  notes?: string;
  tenantId?: string | Tenant;
  createdAt: string | Date;
  updatedAt: string | Date;
}
