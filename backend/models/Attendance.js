
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
  }
}, { timestamps: true });

attendanceSchema.index({ employeeId: 1, date: -1 });

// Make sure virtual id is included
attendanceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    return ret;
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
