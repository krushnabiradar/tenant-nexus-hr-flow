
const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
  try {
    const { employeeId, date, tenantId } = req.query;
    let query = {};
    
    // Filter by employeeId if provided
    if (employeeId) {
      query.employeeId = employeeId;
    }
    
    // Filter by date if provided
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(searchDate.getDate() + 1);
      
      query.date = {
        $gte: searchDate,
        $lt: nextDay
      };
    }
    
    // Filter by tenantId if provided
    if (tenantId) {
      query.tenantId = tenantId;
    }
    
    const attendance = await Attendance.find(query)
      .populate('employeeId', 'name email');
      
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Get all attendance error:', error);
    res.status(500).json({ message: 'Server error fetching attendance records' });
  }
};

// Get attendance by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate('employeeId', 'name email');
      
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Get attendance by ID error:', error);
    res.status(500).json({ message: 'Server error fetching attendance record' });
  }
};

// Clock in
exports.clockIn = async (req, res) => {
  try {
    const { employeeId, tenantId } = req.body;
    
    // Check if user already clocked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const existingRecord = await Attendance.findOne({
      employeeId,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });
    
    if (existingRecord) {
      // If already clocked in but not clocked out, return the existing record
      if (!existingRecord.clockOut) {
        return res.status(200).json({
          message: 'Already clocked in',
          attendance: existingRecord
        });
      }
      
      // If already clocked out, don't allow another clock in for the day
      return res.status(400).json({
        message: 'Already clocked out for today. Cannot clock in again'
      });
    }
    
    // Create new attendance record
    const now = new Date();
    const attendance = new Attendance({
      employeeId,
      date: now,
      clockIn: now,
      tenantId
    });
    
    await attendance.save();
    
    res.status(201).json(attendance);
  } catch (error) {
    console.error('Clock in error:', error);
    res.status(500).json({ message: 'Server error during clock in' });
  }
};

// Clock out
exports.clockOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    
    // Find today's attendance record
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const attendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });
    
    if (!attendance) {
      return res.status(404).json({ message: 'No clock-in record found for today' });
    }
    
    if (attendance.clockOut) {
      return res.status(400).json({ message: 'Already clocked out for today' });
    }
    
    // Update with clock out time
    const now = new Date();
    attendance.clockOut = now;
    
    // Calculate hours worked
    const clockInTime = new Date(attendance.clockIn).getTime();
    const clockOutTime = now.getTime();
    const diffMs = clockOutTime - clockInTime;
    const diffHrs = diffMs / (1000 * 60 * 60);
    attendance.hoursWorked = parseFloat(diffHrs.toFixed(2));
    
    await attendance.save();
    
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Clock out error:', error);
    res.status(500).json({ message: 'Server error during clock out' });
  }
};

// Update attendance (admin or manager only)
exports.updateAttendance = async (req, res) => {
  try {
    const { clockIn, clockOut, notes } = req.body;
    const updateData = {};
    
    if (clockIn) updateData.clockIn = new Date(clockIn);
    if (clockOut) updateData.clockOut = new Date(clockOut);
    if (notes) updateData.notes = notes;
    
    // Recalculate hours worked if both clockIn and clockOut are present
    if ((clockIn || clockOut) && (updateData.clockIn || (await Attendance.findById(req.params.id)).clockIn) && 
        (updateData.clockOut || (await Attendance.findById(req.params.id)).clockOut)) {
      
      const record = await Attendance.findById(req.params.id);
      const newClockIn = updateData.clockIn || record.clockIn;
      const newClockOut = updateData.clockOut || record.clockOut;
      
      const clockInTime = new Date(newClockIn).getTime();
      const clockOutTime = new Date(newClockOut).getTime();
      const diffMs = clockOutTime - clockInTime;
      const diffHrs = diffMs / (1000 * 60 * 60);
      updateData.hoursWorked = parseFloat(diffHrs.toFixed(2));
    }
    
    updateData.updatedAt = Date.now();
    
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).populate('employeeId', 'name email');
    
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Update attendance error:', error);
    res.status(500).json({ message: 'Server error updating attendance record' });
  }
};

// Delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    
    await Attendance.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Delete attendance error:', error);
    res.status(500).json({ message: 'Server error deleting attendance record' });
  }
};

// Get attendance statistics for a specific employee
exports.getEmployeeAttendanceStats = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { month, year } = req.query;
    
    let startDate, endDate;
    
    if (month && year) {
      // If month and year provided, get stats for that month
      startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      endDate = new Date(parseInt(year), parseInt(month), 0);
    } else {
      // Default to current month
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
    
    const records = await Attendance.find({
      employeeId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });
    
    let totalHours = 0;
    let daysPresent = records.length;
    let earlyArrivals = 0;
    let lateArrivals = 0;
    
    // Define 9 AM as standard start time
    const standardStartHour = 9;
    
    records.forEach(record => {
      // Add hours worked
      totalHours += record.hoursWorked || 0;
      
      // Check if late or early
      const clockInHour = new Date(record.clockIn).getHours();
      const clockInMinutes = new Date(record.clockIn).getMinutes();
      
      if (clockInHour < standardStartHour || (clockInHour === standardStartHour && clockInMinutes === 0)) {
        earlyArrivals++;
      } else {
        lateArrivals++;
      }
    });
    
    res.status(200).json({
      totalHours: parseFloat(totalHours.toFixed(2)),
      daysPresent,
      earlyArrivals,
      lateArrivals,
      avgHoursPerDay: daysPresent > 0 ? parseFloat((totalHours / daysPresent).toFixed(2)) : 0
    });
  } catch (error) {
    console.error('Get employee attendance stats error:', error);
    res.status(500).json({ message: 'Server error fetching employee attendance statistics' });
  }
};
