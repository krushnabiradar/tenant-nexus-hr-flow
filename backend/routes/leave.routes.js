
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const { verifyToken, checkRoles } = require('../middleware/auth.middleware');

// Apply JWT verification middleware to all routes
router.use(verifyToken);

// Get all leaves (managers, company admins, and HR)
router.get('/', checkRoles(['admin', 'company', 'manager', 'hr']), leaveController.getAllLeaves);

// Get leave by ID
router.get('/:id', leaveController.getLeaveById);

// Create new leave request (all authenticated users)
router.post('/', leaveController.createLeave);

// Update leave (managers, company admins, and HR)
router.put('/:id', checkRoles(['admin', 'company', 'manager', 'hr']), leaveController.updateLeave);

// Delete leave (only pending leaves can be deleted)
router.delete('/:id', leaveController.deleteLeave);

// Get leave statistics for a specific employee
router.get('/employee/:employeeId/stats', leaveController.getEmployeeLeaveStats);

module.exports = router;
