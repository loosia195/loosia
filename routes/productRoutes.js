// routes/productRoutes.js
const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");

const router = express.Router();

// GET / (lấy ds product)
router.get("/", productController.getProducts);

// POST / (thêm product) => cần auth
router.post("/", auth, productController.createProduct);

// PUT /:id (sửa product) => cần auth
router.put("/:id", auth, productController.updateProduct);

// DELETE /:id (xóa product) => cần auth
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
