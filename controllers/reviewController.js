// controllers/reviewController.js
const Review = require("../models/review");
const Product = require("../models/product");

const reviewController = {
  // Thêm review
  addReview: async (req, res) => {
    try {
      const userId = req.user.userId; // user login
      const { id: productId } = req.params; // product id from URL
      const { rating, comment } = req.body;

      // Kiểm tra rating hợp lệ
      if (!rating || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ success: false, message: "Rating must be 1-5" });
      }

      // Kiểm tra product có tồn tại?
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      // Tạo review
      const newReview = new Review({
        user: userId,
        product: productId,
        rating,
        comment,
      });
      await newReview.save();

      res.json({ success: true, review: newReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Lấy review của 1 sản phẩm
  getReviews: async (req, res) => {
    try {
      const { id: productId } = req.params;

      // Tìm review theo product
      const reviews = await Review.find({ product: productId })
        .populate("user", "username")
        .sort({ createdAt: -1 }); // mới nhất lên trước

      res.json({ success: true, reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // (Tuỳ chọn) Tính average rating
  getAverageRating: async (req, res) => {
    try {
      const { id: productId } = req.params;

      // Tính trung bình rating qua Aggregation
      const result = await Review.aggregate([
        {
          $match: {
            product: new require("mongoose").Types.ObjectId(productId),
          },
        },
        {
          $group: {
            _id: null,
            avgRating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
      ]);

      if (result.length === 0) {
        return res.json({ success: true, avgRating: 0, count: 0 });
      }

      res.json({
        success: true,
        avgRating: result[0].avgRating,
        count: result[0].count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = reviewController;
