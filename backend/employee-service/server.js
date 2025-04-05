
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Import models
const Employee = require('./models/Employee');

// Routes
// Create new employee
app.post('/', [authenticate, 
  body('userId').notEmpty().withMessage('User ID is required'),
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('joinDate').isISO8601().withMessage('Join date must be a valid date')
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Only HR or SuperAdmin can create employees
    if (req.user.role !== 'HR' && req.user.role !== 'SuperAdmin') {
      return res.status(403).json({ message: 'Access denied: Not authorized' });
    }

    const { userId, jobTitle, department, managerId, salary, joinDate } = req.body;
    const tenantId = req.user.tenantId;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ userId });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee profile already exists for this user' });
    }

    // Create new employee
    const employee = new Employee({
      tenantId,
      userId,
      jobTitle,
      department,
      managerId,
      salary,
      employmentStatus: 'Active',
      joinDate
    });

    await employee.save();

    // Update user in auth service
    try {
      await axios.put(`${process.env.AUTH_SERVICE_URL}/users/${userId}`, {
        employeeProfile: employee._id
      }, {
        headers: {
          'x-auth-token': req.header('x-auth-token')
        }
      });
    } catch (error) {
      console.error('Error updating user in auth service:', error);
      // Continue even if this fails, can be reconciled later
    }

    // Update tenant employee count
    try {
      await axios.put(`${process.env.TENANT_SERVICE_URL}/tenants/${tenantId}/increment-employees`, {}, {
        headers: {
          'x-auth-token': req.header('x-auth-token')
        }
      });
    } catch (error) {
      console.error('Error updating tenant employee count:', error);
      // Continue even if this fails, can be reconciled later
    }

    res.status(201).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all employees (filtered by tenant if not SuperAdmin)
app.get('/', authenticate, async (req, res) => {
  try {
    let query = {};
    
    // Filter by tenant for non-SuperAdmin users
    if (req.user.role !== 'SuperAdmin') {
      query.tenantId = req.user.tenantId;
    }
    
    // Add department filter if provided
    if (req.query.department) {
      query.department = req.query.department;
    }
    
    // Add employment status filter if provided
    if (req.query.status) {
      query.employmentStatus = req.query.status;
    }

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get employee by ID
app.get('/:id', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Check authorization: must be same tenant unless SuperAdmin
    if (req.user.role !== 'SuperAdmin' && employee.tenantId.toString() !== req.user.tenantId) {
      return res.status(403).json({ message: 'Access denied: Not authorized for this employee' });
    }
    
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update employee
app.put('/:id', [authenticate,
  body('jobTitle').optional().notEmpty().withMessage('Job title cannot be empty'),
  body('department').optional().notEmpty().withMessage('Department cannot be empty'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('employmentStatus').optional().isIn(['Active', 'On Leave', 'Resigned', 'Terminated']).withMessage('Invalid status')
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Check authorization: must be same tenant AND (HR or SuperAdmin)
    if ((req.user.role !== 'HR' && req.user.role !== 'SuperAdmin') || 
        (req.user.role !== 'SuperAdmin' && employee.tenantId.toString() !== req.user.tenantId)) {
      return res.status(403).json({ message: 'Access denied: Not authorized to update this employee' });
    }
    
    // Update fields
    const { jobTitle, department, managerId, salary, employmentStatus, exitDate } = req.body;
    
    if (jobTitle) employee.jobTitle = jobTitle;
    if (department) employee.department = department;
    if (managerId) employee.managerId = managerId;
    if (salary) employee.salary = salary;
    if (employmentStatus) employee.employmentStatus = employmentStatus;
    if (exitDate) employee.exitDate = exitDate;
    
    await employee.save();
    
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Employee service is running' });
});

app.listen(PORT, () => {
  console.log(`Employee Service running on port ${PORT}`);
});
