
interface Attendance {
  id: string;
  _id?: string;
  employeeId: string | Employee;
  date: string | Date;
  clockIn: string;
  clockOut?: string;
  status: 'Present' | 'Absent' | 'On Leave' | 'Late';
  overtimeHours: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
