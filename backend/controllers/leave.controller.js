
const Leave = require('../models/Leave');
const User = require('../models/User');

// Get all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const { employeeId, status, tenantId } = req.query;
    let query = {};
    
    // Filter by employeeId if provided
    if (employeeId) {
      query.employeeId = employeeId;
    }
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by tenantId if provided
    if (tenantId) {
      query.tenantId = tenantId;
    }
    
    const leaves = await Leave.find(query)
      .populate('employeeId', 'name email')
      .populate('approvedBy', 'name email');
      
    res.status(200).json(leaves);
  } catch (error) {
    console.error('Get all leaves error:', error);
    res.status(500).json({ message: 'Server error fetching leaves' });
  }
};

// Get leave by ID
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate('employeeId', 'name email')
      .populate('approvedBy', 'name email');
      
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    
    res.status(200).json(leave);
  } catch (error) {
    console.error('Get leave by ID error:', error);
    res.status(500).json({ message: 'Server error fetching leave' });
  }
};

// Create leave
exports.createLeave = async (req, res) => {
  try {
    const { 
      employeeId, 
      startDate, 
      endDate, 
      reason, 
      type, 
      tenantId 
    } = req.body;
    
    // Calculate the number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the start date
    
    // Create new leave request
    const leave = new Leave({
      employeeId,
      startDate,
      endDate,
      numberOfDays: diffDays,
      reason,
      type,
      status: 'Pending',
      tenantId
    });
    
    await leave.save();
    
    res.status(201).json(leave);
  } catch (error) {
    console.error('Create leave error:', error);
    res.status(500).json({ message: 'Server error creating leave request' });
  }
};

// Update leave
exports.updateLeave = async (req, res) => {
  try {
    const { status, approvedBy, comments } = req.body;
    const updateData = {};
    
    if (status) updateData.status = status;
    if (approvedBy) updateData.approvedBy = approvedBy;
    if (comments) updateData.comments = comments;
    updateData.updatedAt = Date.now();
    
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    )
    .populate('employeeId', 'name email')
    .populate('approvedBy', 'name email');
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    
    res.status(200).json(leave);
  } catch (error) {
    console.error('Update leave error:', error);
    res.status(500).json({ message: 'Server error updating leave' });
  }
};

// Delete leave
exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    
    // Only allow deletion of pending leaves
    if (leave.status !== 'Pending') {
      return res.status(400).json({ 
        message: 'Only pending leave requests can be deleted' 
      });
    }
    
    await Leave.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error('Delete leave error:', error);
    res.status(500).json({ message: 'Server error deleting leave request' });
  }
};

// Get leave statistics for a specific employee
exports.getEmployeeLeaveStats = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    // Get all leaves for the employee in the current year
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);
    
    const leaves = await Leave.find({
      employeeId,
      startDate: { $gte: startOfYear, $lte: endOfYear },
      status: 'Approved'
    });
    
    // Calculate total days by type
    const stats = {
      casual: 0,
      sick: 0,
      annual: 0,
      unpaid: 0,
      total: 0
    };
    
    leaves.forEach(leave => {
      if (stats[leave.type.toLowerCase()]) {
        stats[leave.type.toLowerCase()] += leave.numberOfDays;
      }
      stats.total += leave.numberOfDays;
    });
    
    res.status(200).json(stats);
  } catch (error) {
    console.error('Get employee leave stats error:', error);
    res.status(500).json({ message: 'Server error fetching employee leave statistics' });
  }
};
