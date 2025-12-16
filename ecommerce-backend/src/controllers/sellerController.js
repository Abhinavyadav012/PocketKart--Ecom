const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get seller dashboard stats
// @route   GET /api/seller/stats
exports.getSellerStats = async (req, res, next) => {
  try {
    const sellerId = req.user._id;
    
    const totalProducts = await Product.countDocuments({ seller: sellerId });
    const activeProducts = await Product.countDocuments({ seller: sellerId, isActive: true });
    
    // Get orders containing seller's products
    const orders = await Order.find({ 'items.seller': sellerId });
    
    let totalSales = 0;
    let totalOrders = orders.length;
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.seller?.toString() === sellerId.toString()) {
          totalSales += item.price * item.quantity;
        }
      });
    });

    res.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        totalOrders,
        totalSales
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller's products
// @route   GET /api/seller/products
exports.getSellerProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort('-createdAt');
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (seller)
// @route   POST /api/seller/products
exports.createProduct = async (req, res, next) => {
  try {
    const productData = {
      ...req.body,
      seller: req.user._id
    };
    
    const product = await Product.create(productData);
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (seller)
// @route   PUT /api/seller/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check ownership
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (seller)
// @route   DELETE /api/seller/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller's orders
// @route   GET /api/seller/orders
exports.getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'items.seller': req.user._id })
      .populate('user', 'name email')
      .sort('-createdAt');
    
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    next(error);
  }
};
