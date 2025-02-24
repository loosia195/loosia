const express = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/auth");

const router = express.Router();

/*
  CHÍNH SÁCH:
  1. POST /api/cart
     - Thêm sản phẩm vào giỏ hàng của người dùng đã đăng nhập.
  2. GET /api/cart
     - Lấy thông tin giỏ hàng hiện tại của người dùng.
  3. DELETE /api/cart/:productId
     - Xoá 1 sản phẩm khỏi giỏ dựa trên productId.
  4. POST /api/cart/checkout
     - Tạo đơn hàng từ giỏ hàng và làm trống giỏ.
*/

// Thêm sản phẩm vào giỏ
router.post("/", auth, cartController.addToCart);

// Lấy giỏ hàng
router.get("/", auth, cartController.getCart);

// Xoá 1 sản phẩm khỏi giỏ theo productId
router.delete("/:productId", auth, cartController.removeItem);

// Tạo đơn hàng từ giỏ và làm trống giỏ
router.post("/checkout", auth, cartController.checkout);

module.exports = router;

