
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
    unique: true,
    index: true
  },
  plan: {
    type: String,
    enum: ["Starter", "Business", "Enterprise"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  billingCycle: {
    type: String,
    enum: ["Monthly", "Yearly"],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  autoRenew: {
    type: Boolean,
    default: true
  },
  gracePeriodEnd: {
    type: Date
  },
  paymentGateway: {
    type: String,
    enum: ["Stripe", "PayPal", "Razorpay"],
    required: true
  },
  transactionId: {
    type: String,
    unique: true
  }
}, { timestamps: true });

// Make sure virtual id is included
subscriptionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    return ret;
  }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
