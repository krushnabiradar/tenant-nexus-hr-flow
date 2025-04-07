
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { verifyToken, checkRoles } = require('../middleware/auth.middleware');

// Apply JWT verification middleware to all routes
router.use(verifyToken);

// Get all attendance records (managers, company admins, and HR)
router.get('/', checkRoles(['admin', 'company', 'manager', 'hr']), attendanceController.getAllAttendance);

// Get attendance by ID
router.get('/:id', attendanceController.getAttendanceById);

// Clock in
router.post('/clock-in', attendanceController.clockIn);

// Clock out
router.post('/clock-out', attendanceController.clockOut);

// Update attendance (managers, company admins only)
router.put('/:id', checkRoles(['admin', 'company', 'manager']), attendanceController.updateAttendance);

// Delete attendance (admin only)
router.delete('/:id', checkRoles(['admin', 'company']), attendanceController.deleteAttendance);

// Get attendance statistics for a specific employee
router.get('/employee/:employeeId/stats', attendanceController.getEmployeeAttendanceStats);

module.exports = router;
