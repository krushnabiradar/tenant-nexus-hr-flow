
const Tenant = require('../models/Tenant');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

// Helper to calculate trend percentage
const calculateTrend = (currentValue, previousValue) => {
  if (!previousValue) return { value: 0, isPositive: true };
  
  const difference = currentValue - previousValue;
  const percentage = previousValue ? Math.round((difference / previousValue) * 100) : 0;
  
  return {
    value: Math.abs(percentage),
    isPositive: difference >= 0
  };
};

// Get complete dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    // Get all required data for the dashboard
    const [stats, performanceData, activityData, recentCompanies] = await Promise.all([
      this.getStats(req, { json: data => data }),
      this.getPerformanceData(req, { json: data => data }),
      this.getSystemActivity(req, { json: data => data }),
      this.getRecentCompanies(req, { json: data => data })
    ]);
    
    res.json({
      stats,
      performanceData,
      activityData,
      recentCompanies
    });
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};

// Get admin stats
exports.getStats = async (req, res) => {
  try {
    // Get current month and previous month dates
    const currentDate = new Date();
    const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    
    // Count active tenants (companies)
    const [currentTenantCount, previousTenantCount] = await Promise.all([
      Tenant.countDocuments({ status: 'Active', createdAt: { $lt: currentDate } }),
      Tenant.countDocuments({ status: 'Active', createdAt: { $lt: firstDayCurrentMonth } })
    ]);
    
    // Count total employees
    const [currentEmployeeCount, previousEmployeeCount] = await Promise.all([
      User.countDocuments({ role: 'Employee', status: 'Active', createdAt: { $lt: currentDate } }),
      User.countDocuments({ role: 'Employee', status: 'Active', createdAt: { $lt: firstDayCurrentMonth } })
    ]);
    
    // API requests (this would typically come from an API logging system)
    // Using mock data as a placeholder
    const currentAPIRequests = 268492;
    const previousAPIRequests = 255000;
    
    // Calculate monthly revenue from subscriptions
    const [currentRevenue, previousRevenue] = await Promise.all([
      Subscription.aggregate([
        { $match: { paymentStatus: 'Paid', createdAt: { $gte: firstDayCurrentMonth, $lt: currentDate } } },
        { $group: { _id: null, total: { $sum: '$price' } } }
      ]),
      Subscription.aggregate([
        { $match: { paymentStatus: 'Paid', createdAt: { $gte: firstDayPreviousMonth, $lt: firstDayCurrentMonth } } },
        { $group: { _id: null, total: { $sum: '$price' } } }
      ])
    ]);
    
    const currentRevenueValue = (currentRevenue[0]?.total || 0);
    const previousRevenueValue = (previousRevenue[0]?.total || 0);
    
    const stats = {
      totalCompanies: { 
        value: currentTenantCount.toString(),
        trend: calculateTrend(currentTenantCount, previousTenantCount)
      },
      totalEmployees: { 
        value: currentEmployeeCount.toLocaleString(),
        trend: calculateTrend(currentEmployeeCount, previousEmployeeCount)
      },
      apiRequests: { 
        value: currentAPIRequests.toLocaleString(),
        trend: calculateTrend(currentAPIRequests, previousAPIRequests)
      },
      monthlyRevenue: { 
        value: `$${currentRevenueValue.toLocaleString()}`,
        trend: calculateTrend(currentRevenueValue, previousRevenueValue)
      }
    };
    
    // Return the data or pass it to the dashboard endpoint
    if (res.json) {
      return res.json(stats);
    }
    return stats;
  } catch (error) {
    console.error('Error in getStats:', error);
    if (res.status) {
      return res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
    throw error;
  }
};

// Get system activity
exports.getSystemActivity = async (req, res) => {
  try {
    // Get recent system activities
    // This would typically come from an activity log table
    // For now, generate some sample data with recent timestamps
    const activities = [
      { action: 'New tenant registered', timestamp: new Date(Date.now() - 25 * 60 * 1000), user: 'System' },
      { action: 'Subscription plan updated', timestamp: new Date(Date.now() - 120 * 60 * 1000), user: 'Admin' },
      { action: 'Security alert triggered', timestamp: new Date(Date.now() - 180 * 60 * 1000), user: 'System' },
      { action: 'Database backup created', timestamp: new Date(Date.now() - 360 * 60 * 1000), user: 'System' },
      { action: 'User login failed (3 attempts)', timestamp: new Date(Date.now() - 480 * 60 * 1000), user: 'Security' }
    ];
    
    // Return the data or pass it to the dashboard endpoint
    if (res.json) {
      return res.json(activities);
    }
    return activities;
  } catch (error) {
    console.error('Error in getSystemActivity:', error);
    if (res.status) {
      return res.status(500).json({ message: 'Error fetching system activity', error: error.message });
    }
    throw error;
  }
};

// Get recent companies
exports.getRecentCompanies = async (req, res) => {
  try {
    // Get recently created tenants
    const recentTenants = await Tenant.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('subscriptionId')
      .lean();
    
    const recentCompanies = recentTenants.map(tenant => ({
      id: tenant._id.toString(),
      name: tenant.name,
      domain: tenant.domain,
      employeeCount: tenant.totalEmployees,
      status: tenant.status,
      plan: tenant.subscriptionId?.plan || 'Unknown',
      createdAt: tenant.createdAt
    }));
    
    // Return the data or pass it to the dashboard endpoint
    if (res.json) {
      return res.json(recentCompanies);
    }
    return recentCompanies;
  } catch (error) {
    console.error('Error in getRecentCompanies:', error);
    if (res.status) {
      return res.status(500).json({ message: 'Error fetching recent companies', error: error.message });
    }
    throw error;
  }
};

// Get performance data for charts
exports.getPerformanceData = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let performanceData;
    
    if (period === 'week') {
      // Last 7 days data
      performanceData = [
        { name: 'Mon', tenants: 3, employees: 28, revenue: 1200 },
        { name: 'Tue', tenants: 2, employees: 15, revenue: 900 },
        { name: 'Wed', tenants: 4, employees: 32, revenue: 1400 },
        { name: 'Thu', tenants: 3, employees: 26, revenue: 1100 },
        { name: 'Fri', tenants: 5, employees: 40, revenue: 1600 },
        { name: 'Sat', tenants: 1, employees: 8, revenue: 500 },
        { name: 'Sun', tenants: 1, employees: 6, revenue: 400 }
      ];
    } else if (period === 'month') {
      // Last month data (30 days)
      // Generate mock data for simplicity, in a real application this would come from database aggregations
      performanceData = Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        // Create some variation in the data
        const tenants = Math.floor(Math.random() * 5) + 1;
        const employees = Math.floor(Math.random() * 50) + 10;
        const revenue = Math.floor(Math.random() * 2000) + 500;
        
        return {
          name: day.toString(),
          tenants,
          employees,
          revenue
        };
      });
    } else if (period === 'year') {
      // Last year data (by month)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      performanceData = months.map(month => {
        // Create some variation in the data
        const tenants = Math.floor(Math.random() * 15) + 5;
        const employees = Math.floor(Math.random() * 200) + 50;
        const revenue = Math.floor(Math.random() * 20000) + 5000;
        
        return {
          name: month,
          tenants,
          employees,
          revenue
        };
      });
    }
    
    // Return the data or pass it to the dashboard endpoint
    if (res.json) {
      return res.json(performanceData);
    }
    return performanceData;
  } catch (error) {
    console.error('Error in getPerformanceData:', error);
    if (res.status) {
      return res.status(500).json({ message: 'Error fetching performance data', error: error.message });
    }
    throw error;
  }
};
