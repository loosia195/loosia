// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const auth = require('../middlewares/auth');

/**
 * Tạo review cho 1 sản phẩm
 * @route POST /api/product/:id/review
 */
router.post('/:id/review', auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.userId; // Lấy userId từ token

    // Tạo review mới
    const newReview = new Review({
      product: productId,
      user: userId,
      rating,
      comment
    });
    await newReview.save();

    return res.json({ success: true, review: newReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/**
 * Lấy danh sách review của 1 sản phẩm
 * @route GET /api/product/:id/review
 */
router.get('/:id/review', async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ product: productId })
      .populate('user', 'username') // hiển thị username của user
      .sort({ createdAt: -1 });     // sắp xếp mới nhất lên trước

    return res.json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

module.exports = router;
