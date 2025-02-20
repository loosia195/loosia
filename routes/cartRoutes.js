// routes/cartRoutes.js
const express = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/auth");

const router = express.Router();

// POST /api/cart => Thêm sản phẩm vào giỏ
router.post("/", auth, cartController.addToCart);

// GET /api/cart => Xem giỏ
router.get("/", auth, cartController.getCart);

// DELETE /api/cart/:productId => Xoá 1 sản phẩm
router.delete("/:productId", auth, cartController.removeItem);

// POST /api/cart/checkout => Tạo order, trống giỏ
router.post("/checkout", auth, cartController.checkout);

module.exports = router;
