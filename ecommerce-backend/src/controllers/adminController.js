const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Admin only
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Run all count queries in parallel for better performance
    const [
      totalUsers,
      totalSellers,
      pendingSellers,
      totalProducts,
      totalOrders,
      activeUsers,
      blockedUsers
    ] = await Promise.all([
      User.countDocuments({ roles: 'user' }),
      User.countDocuments({ roles: 'seller', 'sellerInfo.isApproved': true }),
      User.countDocuments({ 
        'sellerInfo.appliedAt': { $exists: true }, 
        'sellerInfo.isApproved': false 
      }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: false })
    ]);

    // Get order status breakdown
    const orderStats = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Calculate total revenue from completed orders
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['Delivered', 'Shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(10)
      .lean();

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: totalUsers,
          sellers: totalSellers,
          pendingSellers,
          products: totalProducts,
          orders: totalOrders,
          activeUsers,
          blockedUsers
        },
        revenue: {
          total: revenueResult[0]?.total || 0,
          currency: 'INR'
        },
        orderStats: orderStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all users with pagination and filters
 * @route   GET /api/admin/users
 * @access  Admin only
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      role, 
      status,
      search 
    } = req.query;

    // Build filter query
    const filter = {};
    
    if (role) {
      filter.roles = role;
    }
    
    if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'blocked') {
      filter.isActive = false;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Block a user
 * @route   PATCH /api/admin/user/:id/block
 * @access  Admin only
 */
exports.blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent blocking admins
    if (user.roles.includes('admin')) {
      return res.status(403).json({
        success: false,
        message: 'Cannot block admin users'
      });
    }

    // Check if already blocked
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'User is already blocked'
      });
    }

    user.isActive = false;
    user.blockedAt = new Date();
    user.blockReason = reason || 'Blocked by admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        blockedAt: user.blockedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Unblock a user
 * @route   PATCH /api/admin/user/:id/unblock
 * @access  Admin only
 */
exports.unblockUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already active
    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'User is already active'
      });
    }

    user.isActive = true;
    user.blockedAt = undefined;
    user.blockReason = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User unblocked successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get pending seller applications
 * @route   GET /api/admin/seller-applications
 * @access  Admin only
 */
exports.getSellerApplications = async (req, res, next) => {
  try {
    const { status = 'pending' } = req.query;

    let filter = {};

    if (status === 'pending') {
      filter = {
        'sellerInfo.appliedAt': { $exists: true },
        'sellerInfo.isApproved': false,
        'sellerInfo.rejectedAt': { $exists: false }
      };
    } else if (status === 'approved') {
      filter = {
        'sellerInfo.isApproved': true
      };
    } else if (status === 'rejected') {
      filter = {
        'sellerInfo.rejectedAt': { $exists: true }
      };
    }

    const applications = await User.find(filter)
      .select('name email phone sellerInfo createdAt')
      .sort('-sellerInfo.appliedAt')
      .lean();

    res.status(200).json({
      success: true,
      data: {
        applications,
        count: applications.length
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Approve seller application
 * @route   PATCH /api/admin/seller/:id/approve
 * @access  Admin only
 */
exports.approveSeller = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has applied
    if (!user.sellerInfo?.appliedAt) {
      return res.status(400).json({
        success: false,
        message: 'User has not applied to become a seller'
      });
    }

    // Check if already approved
    if (user.sellerInfo.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'Seller is already approved'
      });
    }

    // Add seller role if not present
    if (!user.roles.includes('seller')) {
      user.roles.push('seller');
    }

    user.sellerInfo.isApproved = true;
    user.sellerInfo.approvedAt = new Date();
    user.sellerInfo.approvedBy = req.user._id;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Seller application approved successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        storeName: user.sellerInfo.storeName,
        approvedAt: user.sellerInfo.approvedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reject seller application
 * @route   PATCH /api/admin/seller/:id/reject
 * @access  Admin only
 */
exports.rejectSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user has applied
    if (!user.sellerInfo?.appliedAt) {
      return res.status(400).json({
        success: false,
        message: 'User has not applied to become a seller'
      });
    }

    // Check if already approved
    if (user.sellerInfo.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'Cannot reject an already approved seller'
      });
    }

    // Store rejection info
    user.sellerInfo.rejectedAt = new Date();
    user.sellerInfo.rejectedBy = req.user._id;
    user.sellerInfo.rejectionReason = reason || 'Application rejected by admin';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Seller application rejected',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        rejectedAt: user.sellerInfo.rejectedAt,
        reason: user.sellerInfo.rejectionReason
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/admin/product/:id
 * @access  Admin only
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Store product info before deletion
    const deletedProductInfo = {
      id: product._id,
      name: product.name,
      seller: product.seller
    };

    // Hard delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProductInfo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/admin/orders
 * @access  Admin only
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status,
      startDate,
      endDate 
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'name email')
        .populate('items.product', 'name price')
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Order.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products (admin)
 * @route   GET /api/admin/products
 * @access  Admin only
 */
exports.getAllProducts = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category,
      seller,
      search 
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (seller) {
      filter.seller = seller;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('seller', 'name email sellerInfo.storeName')
        .sort('-createdAt')
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle user active status (legacy support)
 * @route   PUT /api/admin/users/:id/toggle-status
 * @access  Admin only
 */
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Prevent blocking admins
    if (user.roles.includes('admin')) {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify admin user status'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: `User ${user.isActive ? 'activated' : 'deactivated'}`,
      data: {
        id: user._id,
        name: user.name,
        isActive: user.isActive
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Handle seller application (legacy support)
 * @route   PUT /api/admin/seller-applications/:id
 * @access  Admin only
 */
exports.handleSellerApplication = async (req, res, next) => {
  try {
    const { action, reason } = req.body;

    if (action === 'approve') {
      return exports.approveSeller(req, res, next);
    } else if (action === 'reject') {
      req.body.reason = reason;
      return exports.rejectSeller(req, res, next);
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid action. Use "approve" or "reject"' 
      });
    }
  } catch (error) {
    next(error);
  }
};
