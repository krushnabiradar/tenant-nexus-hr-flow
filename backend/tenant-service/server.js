
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3002;

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

// Admin middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'SuperAdmin') {
    return res.status(403).json({ message: 'Access denied: Admin only' });
  }
  next();
};

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Import models
const Tenant = require('./models/Tenant');
const Subscription = require('./models/Subscription');

// Routes
// Create new tenant
app.post('/', [authenticate, adminOnly, 
  body('name').notEmpty().withMessage('Name is required'),
  body('domain').notEmpty().withMessage('Domain is required'),
  body('subscriptionPlan').isIn(['Starter', 'Business', 'Enterprise']).withMessage('Invalid subscription plan'),
  body('billingCycle').isIn(['Monthly', 'Yearly']).withMessage('Invalid billing cycle')
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, domain, subscriptionPlan, billingCycle } = req.body;

    // Check if tenant with domain already exists
    const existingTenant = await Tenant.findOne({ domain });
    if (existingTenant) {
      return res.status(400).json({ message: 'Tenant with this domain already exists' });
    }

    // Define pricing based on plan
    let price = 0;
    switch(subscriptionPlan) {
      case 'Starter':
        price = billingCycle === 'Monthly' ? 50 : 500;
        break;
      case 'Business':
        price = billingCycle === 'Monthly' ? 100 : 1000;
        break;
      case 'Enterprise':
        price = billingCycle === 'Monthly' ? 200 : 2000;
        break;
    }

    // Create subscription
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (billingCycle === 'Monthly' ? 1 : 12));
    
    const subscription = new Subscription({
      plan: subscriptionPlan,
      price,
      billingCycle,
      startDate,
      endDate,
      nextBillingDate: endDate,
      paymentStatus: 'Pending',
      paymentGateway: 'Stripe',
      transactionId: `tr_${Date.now()}`
    });

    await subscription.save();

    // Create tenant
    const tenant = new Tenant({
      name,
      domain,
      subscriptionId: subscription._id,
      status: 'Active'
    });

    await tenant.save();

    // Update subscription with tenant reference
    subscription.tenantId = tenant._id;
    await subscription.save();

    res.status(201).json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all tenants
app.get('/', [authenticate, adminOnly], async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('subscriptionId');
    res.json(tenants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get tenant by ID
app.get('/:id', authenticate, async (req, res) => {
  try {
    // Only allow access to own tenant data unless SuperAdmin
    if (req.user.role !== 'SuperAdmin' && req.user.tenantId !== req.params.id) {
      return res.status(403).json({ message: 'Access denied: Not authorized for this tenant' });
    }

    const tenant = await Tenant.findById(req.params.id).populate('subscriptionId');
    
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update tenant
app.put('/:id', [authenticate, 
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('status').optional().isIn(['Active', 'Suspended', 'Pending']).withMessage('Invalid status')
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Only allow updates to own tenant unless SuperAdmin
    if (req.user.role !== 'SuperAdmin' && req.user.tenantId !== req.params.id) {
      return res.status(403).json({ message: 'Access denied: Not authorized for this tenant' });
    }

    // Regular users can only update name, SuperAdmin can update status too
    const updateData = { name: req.body.name };
    if (req.user.role === 'SuperAdmin') {
      updateData.status = req.body.status;
    }

    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    res.json(tenant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Tenant service is running' });
});

app.listen(PORT, () => {
  console.log(`Tenant Service running on port ${PORT}`);
});
