const Review = require('../models/review');
const auth = require('../middlewares/auth');

// Tạo review
router.post('/:id/review', auth, async (req, res) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.userId; // từ token

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

// Lấy review của 1 sản phẩm
router.get('/:id/review', async (req, res) => {
    try {
      const productId = req.params.id;
      const reviews = await Review.find({ product: productId })
        .populate('user', 'username') // nếu muốn hiển thị tên user
        .sort({ createdAt: -1 });     // mới nhất lên trước
  
      return res.json({ success: true, reviews });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  });
  