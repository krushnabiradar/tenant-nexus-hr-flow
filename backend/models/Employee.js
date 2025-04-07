
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  salary: {
    type: Number,
    required: true
  },
  payrollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payroll'
  },
  employmentStatus: {
    type: String,
    enum: ['Active', 'On Leave', 'Resigned', 'Terminated'],
    default: 'Active'
  },
  joinDate: {
    type: Date,
    required: true
  },
  exitDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

employeeSchema.index({ tenantId: 1, department: 1 });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
