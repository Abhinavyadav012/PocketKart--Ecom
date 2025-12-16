const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT with role info
const generateToken = (id, roles) => {
  return jwt.sign({ id, roles }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, roles: ['user'] });

    res.status(201).json({
      success: true,
      token: generateToken(user._id, user.roles),
      user: { id: user._id, name: user.name, email: user.email, roles: user.roles }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      token: generateToken(user._id, user.roles),
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        roles: user.roles,
        sellerInfo: user.sellerInfo
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin login
// @route   POST /api/auth/admin/login
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.roles.includes('admin')) {
      return res.status(403).json({ success: false, message: 'Admin access only' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      token: generateToken(user._id, user.roles),
      user: { id: user._id, name: user.name, email: user.email, roles: user.roles }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Seller login
// @route   POST /api/auth/seller/login
exports.sellerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.roles.includes('seller')) {
      return res.status(403).json({ success: false, message: 'Not registered as seller' });
    }

    if (!user.sellerInfo.isApproved) {
      return res.status(403).json({ success: false, message: 'Seller account pending approval' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    res.json({
      success: true,
      token: generateToken(user._id, user.roles),
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        roles: user.roles,
        sellerInfo: user.sellerInfo
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply for seller account
// @route   POST /api/auth/apply-seller
exports.applySeller = async (req, res, next) => {
  try {
    const { storeName, storeDescription, gstNumber, bankAccount } = req.body;

    const user = await User.findById(req.user._id);

    if (user.roles.includes('seller')) {
      return res.status(400).json({ success: false, message: 'Already registered as seller' });
    }

    user.sellerInfo = {
      storeName,
      storeDescription,
      gstNumber,
      bankAccount,
      isApproved: true, // Auto-approve for now
      appliedAt: new Date()
    };

    if (!user.roles.includes('seller')) {
      user.roles.push('seller');
    }

    await user.save();

    res.json({
      success: true,
      message: 'Seller application approved successfully.',
      sellerInfo: user.sellerInfo,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        sellerInfo: user.sellerInfo
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({ 
    success: true, 
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      roles: req.user.roles,
      sellerInfo: req.user.sellerInfo,
      createdAt: req.user.createdAt
    }
  });
};
