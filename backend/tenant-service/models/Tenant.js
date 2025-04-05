
const mongoose = require("mongoose");

// Tenant Model
const TenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    domain: { type: String, unique: true, required: true },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
    hrManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    totalEmployees: { type: Number, default: 0 },
    status: { type: String, enum: ["Active", "Suspended", "Pending"], default: "Active" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

TenantSchema.index({ domain: 1 });

module.exports = mongoose.model("Tenant", TenantSchema);
