// routes/productRoutes.js
const express = require("express");
const productController = require("../controllers/productController");
const reviewController = require('../controllers/reviewController');
const auth = require("../middlewares/auth");
const checkRole = require('../middlewares/checkRole');
const router = express.Router();

// Import Multer
const multer = require('multer');

// Cấu hình Multer => lưu file vào "uploads/"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // thư mục uploads
  },
  filename: function (req, file, cb) {
    // Tạo tên file => Date.now() + originalname
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

// GET / (lấy ds product)
router.get("/", productController.getProducts);

// POST / (thêm product) => cần auth
router.post("/", auth, productController.createProduct);

// PUT /:id (sửa product) => cần auth
router.put("/:id", auth, productController.updateProduct);

// DELETE /:id (xóa product) => cần auth
router.delete("/:id", auth, productController.deleteProduct);

+ // POST /api/product/:id/review => user add review
+ router.post('/:id/review', auth, reviewController.addReview);

+ // GET /api/product/:id/review => list reviews
+ router.get('/:id/review', reviewController.getReviews);

+ // GET /api/product/:id/avg-rating => optional
+ router.get('/:id/avg-rating', reviewController.getAverageRating);

// Upload Image => POST /api/product/:id/uploadImage
router.post('/:id/uploadImage', auth, upload.single('image'), productController.uploadImage);

module.exports = router;
