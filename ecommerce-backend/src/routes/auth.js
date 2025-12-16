const express = require('express');
const router = express.Router();
const { register, login, adminLogin, sellerLogin, applySeller, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.post('/seller/login', sellerLogin);
router.post('/apply-seller', protect, applySeller);
router.get('/me', protect, getMe);

module.exports = router;
