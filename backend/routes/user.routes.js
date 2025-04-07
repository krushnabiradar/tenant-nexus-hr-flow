
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin, isCompany, checkRoles } = require('../middleware/auth.middleware');

// Apply JWT verification middleware to all routes
router.use(verifyToken);

// Get all users (admin and company admin only)
router.get('/', checkRoles(['admin', 'company']), userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user (admin and company admin only)
router.put('/:id', checkRoles(['admin', 'company']), userController.updateUser);

// Delete user (admin only)
router.delete('/:id', isAdmin, userController.deleteUser);

module.exports = router;
