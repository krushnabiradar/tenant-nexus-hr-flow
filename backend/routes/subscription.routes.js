
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { verifyToken, isAdmin, isCompany } = require('../middleware/auth.middleware');

// Apply JWT verification middleware to all routes
router.use(verifyToken);

// Subscription plans routes (available to all authenticated users)
router.get('/plans', subscriptionController.getAllPlans);
router.get('/plans/:id', subscriptionController.getPlanById);

// Admin-only routes for managing subscription plans
router.post('/plans', isAdmin, subscriptionController.createPlan);
router.put('/plans/:id', isAdmin, subscriptionController.updatePlan);
router.delete('/plans/:id', isAdmin, subscriptionController.deletePlan);

// Company subscription management
router.post('/', isCompany, subscriptionController.subscribeTenant);
router.get('/tenant/:tenantId', subscriptionController.getSubscriptionByTenant);
router.put('/:subscriptionId/cancel', isCompany, subscriptionController.cancelSubscription);

// Admin routes for viewing all subscriptions
router.get('/', isAdmin, subscriptionController.getAllSubscriptions);

module.exports = router;
