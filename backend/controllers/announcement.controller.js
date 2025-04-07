
const Announcement = require('../models/Announcement');

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const { tenantId, category } = req.query;
    let query = {};
    
    // Filter by tenantId if provided
    if (tenantId) {
      query.tenantId = tenantId;
    }
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    const announcements = await Announcement.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
      
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Get all announcements error:', error);
    res.status(500).json({ message: 'Server error fetching announcements' });
  }
};

// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate('createdBy', 'name');
      
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.status(200).json(announcement);
  } catch (error) {
    console.error('Get announcement by ID error:', error);
    res.status(500).json({ message: 'Server error fetching announcement' });
  }
};

// Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { 
      title, 
      content, 
      category, 
      tenantId,
      targetDepartments,
      startDate,
      endDate
    } = req.body;
    
    // Create new announcement
    const announcement = new Announcement({
      title,
      content,
      category: category || 'General',
      createdBy: req.userId,
      tenantId,
      targetDepartments: targetDepartments || [],
      startDate: startDate || new Date(),
      endDate: endDate
    });
    
    await announcement.save();
    
    res.status(201).json(announcement);
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ message: 'Server error creating announcement' });
  }
};

// Update announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { 
      title, 
      content, 
      category,
      isActive,
      targetDepartments,
      startDate,
      endDate
    } = req.body;
    
    const updateData = {};
    
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (targetDepartments) updateData.targetDepartments = targetDepartments;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    updateData.updatedAt = Date.now();
    
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).populate('createdBy', 'name');
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.status(200).json(announcement);
  } catch (error) {
    console.error('Update announcement error:', error);
    res.status(500).json({ message: 'Server error updating announcement' });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    await Announcement.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ message: 'Server error deleting announcement' });
  }
};
