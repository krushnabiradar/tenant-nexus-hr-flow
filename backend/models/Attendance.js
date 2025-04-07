
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  clockIn: {
    type: String,
    required: true
  },
  clockOut: {
    type: String
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'On Leave', 'Late'],
    default: 'Present'
  },
  overtimeHours: {
    type: Number,
    default: 0
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

attendanceSchema.index({ employeeId: 1, date: -1 });

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
