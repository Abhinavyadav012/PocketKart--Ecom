const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  blockUser,
  unblockUser,
  getSellerApplications,
  approveSeller,
  rejectSeller,
  deleteProduct,
  getAllOrders,
  getAllProducts,
  handleSellerApplication,
  toggleUserStatus
} = require('../controllers/adminController');

/**
 * Admin Routes
 * All routes are protected with JWT verification and admin role check
 * 
 * Middleware chain: protect (JWT) -> adminOnly (role check)
 */
router.use(protect, adminOnly);

// Dashboard
router.get('/stats', getDashboardStats);

// Users Management
router.get('/users', getAllUsers);
router.patch('/user/:id/block', blockUser);
router.patch('/user/:id/unblock', unblockUser);
router.put('/users/:id/toggle-status', toggleUserStatus); // Legacy support

// Seller Applications
router.get('/seller-applications', getSellerApplications);
router.patch('/seller/:id/approve', approveSeller);
router.patch('/seller/:id/reject', rejectSeller);
router.put('/seller-applications/:id', handleSellerApplication); // Legacy support

// Products Management
router.get('/products', getAllProducts);
router.delete('/product/:id', deleteProduct);

// Orders Management
router.get('/orders', getAllOrders);

module.exports = router;
