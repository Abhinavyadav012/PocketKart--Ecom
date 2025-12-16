const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify token
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized - no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    if (!req.user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized - invalid token' });
  }
};

// Check if user has required role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    const hasRequiredRole = roles.some(role => req.user.roles.includes(role));
    
    if (!hasRequiredRole) {
      return res.status(403).json({ 
        success: false, 
        message: `Role ${req.user.roles.join(', ')} is not authorized to access this route` 
      });
    }
    next();
  };
};

// Seller specific middleware - must be approved seller
exports.sellerOnly = (req, res, next) => {
  if (!req.user.roles.includes('seller')) {
    return res.status(403).json({ success: false, message: 'Seller access required' });
  }
  
  if (!req.user.sellerInfo.isApproved) {
    return res.status(403).json({ success: false, message: 'Seller account not approved yet' });
  }
  
  next();
};

// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (!req.user.roles.includes('admin')) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};
