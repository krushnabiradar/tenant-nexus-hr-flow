
const Subscription = require('../models/Subscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const Tenant = require('../models/Tenant');

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json(plans);
  } catch (error) {
    console.error('Get all subscription plans error:', error);
    res.status(500).json({ message: 'Server error fetching subscription plans' });
  }
};

// Get a subscription plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error('Get subscription plan by ID error:', error);
    res.status(500).json({ message: 'Server error fetching subscription plan' });
  }
};

// Create a new subscription plan (admin only)
exports.createPlan = async (req, res) => {
  try {
    const { name, description, price, billingCycle, maxEmployees, features, displayOrder } = req.body;
    
    // Check if plan with the name already exists
    const existingPlan = await SubscriptionPlan.findOne({ name });
    if (existingPlan) {
      return res.status(400).json({ message: 'Subscription plan with this name already exists' });
    }
    
    const newPlan = new SubscriptionPlan({
      name,
      description,
      price,
      billingCycle: billingCycle || 'monthly',
      maxEmployees,
      features: features || [],
      displayOrder: displayOrder || 0
    });
    
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    console.error('Create subscription plan error:', error);
    res.status(500).json({ message: 'Server error creating subscription plan' });
  }
};

// Update a subscription plan (admin only)
exports.updatePlan = async (req, res) => {
  try {
    const { name, description, price, billingCycle, maxEmployees, features, isActive, displayOrder } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (billingCycle) updateData.billingCycle = billingCycle;
    if (maxEmployees !== undefined) updateData.maxEmployees = maxEmployees;
    if (features) updateData.features = features;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    updateData.updatedAt = Date.now();
    
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    
    res.status(200).json(plan);
  } catch (error) {
    console.error('Update subscription plan error:', error);
    res.status(500).json({ message: 'Server error updating subscription plan' });
  }
};

// Delete a subscription plan (admin only)
exports.deletePlan = async (req, res) => {
  try {
    // Check if any active subscriptions are using this plan
    const activeSubscriptions = await Subscription.countDocuments({ 
      planId: req.params.id,
      status: 'active'
    });
    
    if (activeSubscriptions > 0) {
      return res.status(400).json({ 
        message: 'This plan has active subscriptions. Deactivate the plan instead of deleting it.' 
      });
    }
    
    const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    
    res.status(200).json({ message: 'Subscription plan deleted successfully' });
  } catch (error) {
    console.error('Delete subscription plan error:', error);
    res.status(500).json({ message: 'Server error deleting subscription plan' });
  }
};

// Subscribe a tenant to a plan
exports.subscribeTenant = async (req, res) => {
  try {
    const { tenantId, planId, paymentMethod } = req.body;
    
    // Verify tenant exists
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    
    // Verify plan exists
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found' });
    }
    
    // Check if tenant already has a subscription
    const existingSubscription = await Subscription.findOne({ tenantId });
    
    // If there's an existing subscription, end it
    if (existingSubscription) {
      existingSubscription.status = 'cancelled';
      existingSubscription.endDate = Date.now();
      await existingSubscription.save();
    }
    
    // Calculate next billing date based on billing cycle
    const startDate = new Date();
    let nextBillingDate = new Date(startDate);
    
    if (plan.billingCycle === 'monthly') {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else if (plan.billingCycle === 'quarterly') {
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 3);
    } else if (plan.billingCycle === 'yearly') {
      nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    }
    
    // Create a new subscription
    const newSubscription = new Subscription({
      tenantId,
      planId,
      name: plan.name,
      price: plan.price,
      billingCycle: plan.billingCycle,
      maxEmployees: plan.maxEmployees,
      features: plan.features,
      startDate,
      nextBillingDate,
      paymentMethod,
      status: 'active'
    });
    
    await newSubscription.save();
    
    // Update the tenant's plan
    tenant.plan = plan.name;
    await tenant.save();
    
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error('Subscribe tenant error:', error);
    res.status(500).json({ message: 'Server error processing subscription' });
  }
};

// Get subscription by tenant ID
exports.getSubscriptionByTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    
    const subscription = await Subscription.findOne({ tenantId, status: 'active' });
    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found for this tenant' });
    }
    
    res.status(200).json(subscription);
  } catch (error) {
    console.error('Get subscription by tenant error:', error);
    res.status(500).json({ message: 'Server error fetching subscription' });
  }
};

// Cancel a subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    subscription.status = 'cancelled';
    subscription.endDate = Date.now();
    await subscription.save();
    
    // Update the tenant's plan to Free
    const tenant = await Tenant.findById(subscription.tenantId);
    if (tenant) {
      tenant.plan = 'Free';
      await tenant.save();
    }
    
    res.status(200).json({ message: 'Subscription cancelled successfully', subscription });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({ message: 'Server error cancelling subscription' });
  }
};

// Get all subscriptions (admin only)
exports.getAllSubscriptions = async (req, res) => {
  try {
    const { status, plan } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (plan) {
      query.name = plan;
    }
    
    const subscriptions = await Subscription.find(query)
      .populate('tenantId', 'name domain');
    
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Get all subscriptions error:', error);
    res.status(500).json({ message: 'Server error fetching subscriptions' });
  }
};
