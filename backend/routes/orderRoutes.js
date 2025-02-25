// routes/orderRoutes.js
const express = require('express');
const auth = require('../middlewares/auth');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

const router = express.Router();

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

module.exports = router;

