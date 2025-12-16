const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const user = req.user;
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    await user.save();
    
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
