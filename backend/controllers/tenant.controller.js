
const Tenant = require('../models/Tenant');
const User = require('../models/User');

// Create a new tenant
exports.createTenant = async (req, res) => {
  try {
    const { name, domain, plan } = req.body;
    
    // Check if tenant with domain already exists
    const domainExists = await Tenant.findOne({ domain });
    if (domainExists) {
      return res.status(400).json({ message: 'Tenant with this domain already exists' });
    }
    
    // Create new tenant
    const tenant = new Tenant({
      name,
      domain,
      plan: plan || 'Free',
      status: 'Pending'
    });
    
    await tenant.save();
    
    res.status(201).json(tenant);
  } catch (error) {
    console.error('Create tenant error:', error);
    res.status(500).json({ message: 'Server error creating tenant' });
  }
};

// Get all tenants
exports.getAllTenants = async (req, res) => {
  try {
    const { status, plan } = req.query;
    let query = {};
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by plan if provided
    if (plan) {
      query.plan = plan;
    }
    
    const tenants = await Tenant.find(query);
    res.status(200).json(tenants);
  } catch (error) {
    console.error('Get all tenants error:', error);
    res.status(500).json({ message: 'Server error fetching tenants' });
  }
};

// Get tenant by ID
exports.getTenantById = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error('Get tenant by ID error:', error);
    res.status(500).json({ message: 'Server error fetching tenant' });
  }
};

// Update tenant
exports.updateTenant = async (req, res) => {
  try {
    const { name, plan, status, totalEmployees } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (plan) updateData.plan = plan;
    if (status) updateData.status = status;
    if (totalEmployees) updateData.totalEmployees = totalEmployees;
    updateData.updatedAt = Date.now();
    
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    res.status(200).json(tenant);
  } catch (error) {
    console.error('Update tenant error:', error);
    res.status(500).json({ message: 'Server error updating tenant' });
  }
};

// Delete tenant
exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    // Check if there are users associated with this tenant
    const userCount = await User.countDocuments({ tenantId: req.params.id });
    if (userCount > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete tenant with associated users. Delete users first or reassign them.' 
      });
    }
    
    // Delete the tenant
    await Tenant.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error('Delete tenant error:', error);
    res.status(500).json({ message: 'Server error deleting tenant' });
  }
};

// Get tenant statistics
exports.getTenantStats = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    // Get count of users by role
    const roles = ['company', 'employee', 'manager', 'finance', 'compliance', 'recruitment'];
    const userStats = {};
    
    for (const role of roles) {
      userStats[role] = await User.countDocuments({ 
        tenantId: req.params.id,
        role
      });
    }
    
    res.status(200).json({
      tenant: {
        id: tenant._id,
        name: tenant.name,
        domain: tenant.domain,
        plan: tenant.plan,
        status: tenant.status,
        totalEmployees: tenant.totalEmployees
      },
      userStats
    });
  } catch (error) {
    console.error('Get tenant stats error:', error);
    res.status(500).json({ message: 'Server error fetching tenant statistics' });
  }
};
