
const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true
  },
  hrManagers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  totalEmployees: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Suspended', 'Pending'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Make sure virtual id is included
tenantSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    return ret;
  }
});

tenantSchema.index({ domain: 1 });

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
