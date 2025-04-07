
const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Apply JWT verification middleware to all routes
router.use(verifyToken);

// Admin-only routes
router.post('/', isAdmin, tenantController.createTenant);
router.get('/', isAdmin, tenantController.getAllTenants);
router.put('/:id', isAdmin, tenantController.updateTenant);
router.delete('/:id', isAdmin, tenantController.deleteTenant);

// Get tenant by ID (accessible by admin and users belonging to the tenant)
router.get('/:id', tenantController.getTenantById);

// Get tenant statistics
router.get('/:id/stats', tenantController.getTenantStats);

module.exports = router;
