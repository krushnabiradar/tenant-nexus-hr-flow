
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true
  },
  planId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    default: 'monthly'
  },
  maxEmployees: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'pending', 'past_due'],
    default: 'pending'
  },
  features: {
    type: [String],
    default: []
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  lastBillingDate: {
    type: Date
  },
  nextBillingDate: {
    type: Date
  },
  paymentMethod: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to ensure uniqueness of subscription per tenant
subscriptionSchema.index({ tenantId: 1, planId: 1 }, { unique: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
