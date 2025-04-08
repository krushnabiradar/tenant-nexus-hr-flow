
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admin role required' });
  }
  next();
};

// Middleware to check company admin role
const isCompany = (req, res, next) => {
  if (req.userRole !== 'company' && req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Company admin role required' });
  }
  next();
};

// Middleware to check manager role
const isManager = (req, res, next) => {
  if (req.userRole !== 'manager' && req.userRole !== 'company' && req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Manager role required' });
  }
  next();
};

// Middleware to check multiple allowed roles
const checkRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ 
        message: `Access denied: Required role is one of [${roles.join(', ')}]` 
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  isAdmin,
  isCompany,
  isManager,
  checkRoles
};
