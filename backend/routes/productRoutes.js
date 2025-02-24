//--------------------------------------------------
// 1) IMPORTS
//--------------------------------------------------
const express = require("express");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const auth = require("../middlewares/auth");
// Nếu cần giới hạn vai trò (admin, employee), import checkRole
// const checkRole = require("../middlewares/checkRole");

//--------------------------------------------------
// 2) CREATE ROUTER
//--------------------------------------------------
const router = express.Router();

/*
  CHÍNH SÁCH:
  1) GET /api/product => Lấy danh sách sản phẩm (public)
  2) POST /api/product => Tạo sản phẩm (cần auth, có thể checkRole(['admin']))
  3) PUT /api/product/:id => Cập nhật sản phẩm (cần auth)
  4) DELETE /api/product/:id => Xoá sản phẩm (cần auth)
  5) POST /api/product/:id/review => Thêm review (cần auth)
  6) GET /api/product/:id/review => Lấy danh sách review (public)
  7) GET /api/product/:id/avg-rating => Tính rating trung bình (tuỳ chọn)
  (Đã bỏ phần upload ảnh, vì tách sang uploadController.js)
*/

//--------------------------------------------------
// 3) DEFINE ROUTES
//--------------------------------------------------

// a) GET / (lấy danh sách product) => public
router.get("/", productController.getProducts);

// b) POST / => thêm product => cần auth (có thể thêm checkRole nếu cần)
router.post("/", auth, productController.createProduct);

// c) PUT /:id => sửa product => cần auth
router.put("/:id", auth, productController.updateProduct);

// d) DELETE /:id => xóa product => cần auth
router.delete("/:id", auth, productController.deleteProduct);

// e) REVIEW
//    POST /:id/review => user add review => cần auth
router.post("/:id/review", auth, reviewController.addReview);

//    GET /:id/review => list reviews => public
router.get("/:id/review", reviewController.getReviews);

//    GET /:id/avg-rating => optional
router.get("/:id/avg-rating", reviewController.getAverageRating);

// f) GET /:id => lấy 1 product theo id => public
router.get("/:id", productController.getProductById);

//--------------------------------------------------
// 4) EXPORT
//--------------------------------------------------
module.exports = router;
