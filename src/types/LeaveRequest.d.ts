
interface LeaveRequest {
  id: string;
  _id?: string;
  employeeId: string | Employee;
  leaveType: 'Sick Leave' | 'Casual Leave' | 'Annual Leave' | 'Maternity Leave';
  startDate: string | Date;
  endDate: string | Date;
  reason?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: string | User;
  createdAt: string | Date;
  updatedAt: string | Date;
}
