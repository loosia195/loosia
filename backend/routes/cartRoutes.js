// routes/cartRoutes.js
const express = require('express');
const auth = require('../middlewares/auth');
const Cart = require('../models/cart');
const Product = require('../models/product');

const router = express.Router();

/**
 * POST /api/cart
 * - Thêm sản phẩm vào giỏ (nếu đã có => tăng quantity)
 * - user = req.user.userId (lấy từ token)
 */
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body; // quantity mặc định = 1

    // Tìm cart theo user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Chưa có => tạo mới
      cart = new Cart({ user: userId, items: [] });
    }

    // Kiểm tra xem items đã có product này chưa
    const idx = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (idx > -1) {
      // Có => tăng quantity
      cart.items[idx].quantity += quantity || 1;
    } else {
      // Chưa có => push
      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await cart.save();
    // Optional: populate product info
    await cart.populate('items.product');

    return res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/**
 * GET /api/cart
 * - Lấy giỏ hàng hiện tại của user
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      // Chưa có cart => trả items rỗng
      return res.json({ success: true, cart: { items: [] } });
    }
    return res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/**
 * DELETE /api/cart/:productId
 * - Xoá 1 sản phẩm khỏi giỏ
 */
router.delete('/:productId', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.json({ success: true, cart: { items: [] } });
    }

    // filter out product
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product');

    return res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/**
 * (Tuỳ chọn) PUT /api/cart/:productId => cập nhật quantity
 */
// router.put('/:productId', auth, async (req, res) => {
//   ...
// });

module.exports = router;
