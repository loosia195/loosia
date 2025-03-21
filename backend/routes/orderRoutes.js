// routes/orderRoutes.js
const express = require('express');
const auth = require('../middlewares/auth');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

const router = express.Router();

/**
 * Tạo đơn hàng (checkout)
 * POST /api/order
 */
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Lấy cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: 'Giỏ hàng trống' });
    }

    // Tính totalPrice
    let total = 0;
    cart.items.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    // Tạo order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map((it) => ({
        product: it.product._id,
        quantity: it.quantity,
      })),
      totalPrice: total,
      status: 'pending',
    });
    await newOrder.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    return res.json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/**
 * Lấy danh sách đơn hàng
 * GET /api/order
 * - Admin => xem tất cả
 * - User => xem đơn của chính họ
 */
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      // Admin => xem tất cả order
      const orders = await Order.find()
        .populate('items.product')
        .populate('user');
      return res.json({ success: true, orders });
    } else {
      // User => xem đơn hàng của chính họ
      const orders = await Order.find({ user: req.user.userId })
        .populate('items.product')
        .populate('user');
      return res.json({ success: true, orders });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/**
 * Cập nhật trạng thái đơn hàng
 * PUT /api/order/:id
 * - Chỉ admin
 * - body: { status: "shipped" | "done" | "cancelled" ... }
 */
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ success: false, message: 'Không có quyền (admin)' });
    }
    const { id } = req.params;
    const { status } = req.body; // "shipped", "done", "cancelled"...
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate('items.product')
      .populate('user');
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Không tìm thấy order' });
    }
    return res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

module.exports = router;


