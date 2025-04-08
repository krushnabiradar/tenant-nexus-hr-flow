
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Apply JWT verification and admin role middleware to all routes
router.use(verifyToken);
router.use(isAdmin);

// Dashboard routes
router.get('/dashboard', adminController.getDashboardData);
router.get('/stats', adminController.getStats);
router.get('/activity', adminController.getSystemActivity);
router.get('/companies/recent', adminController.getRecentCompanies);
router.get('/performance', adminController.getPerformanceData);

module.exports = router;
