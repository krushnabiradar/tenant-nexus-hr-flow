
const mongoose = require("mongoose");

// User Model (RBAC & ABAC)
const UserSchema = new mongoose.Schema({
    tenantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tenant", 
        required: function () { return this.role !== "SuperAdmin"; }, // Required for non-SuperAdmins
        index: true 
    },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["SuperAdmin", "HR", "Manager", "Employee"], required: true },
    permissions: [{ type: String }], // Attribute-Based Access Control (ABAC)
    employeeProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

UserSchema.index({ tenantId: 1, role: 1 });

module.exports = mongoose.model("User", UserSchema);
