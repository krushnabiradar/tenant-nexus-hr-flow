
const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');
const { verifyToken, checkRoles } = require('../middleware/auth.middleware');

// Apply JWT verification middleware to all routes
router.use(verifyToken);

// Get all announcements (all authenticated users)
router.get('/', announcementController.getAllAnnouncements);

// Get announcement by ID
router.get('/:id', announcementController.getAnnouncementById);

// Create announcement (managers, company admins, HR)
router.post('/', checkRoles(['admin', 'company', 'manager', 'hr']), announcementController.createAnnouncement);

// Update announcement (managers, company admins, HR)
router.put('/:id', checkRoles(['admin', 'company', 'manager', 'hr']), announcementController.updateAnnouncement);

// Delete announcement (managers, company admins)
router.delete('/:id', checkRoles(['admin', 'company', 'manager']), announcementController.deleteAnnouncement);

module.exports = router;
