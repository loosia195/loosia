// controllers/productController.js
const Product = require("../models/product");

// Tất cả hàm xử lý product
const productController = {
  // Lấy danh sách product
  getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Thêm product
  createProduct: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Không có quyền" });
      }
      const { name, price } = req.body;
      const newProduct = new Product({ name, price });
      await newProduct.save();
      res.json({ success: true, product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Cập nhật product
  updateProduct: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Không có quyền" });
      }
      const { id } = req.params;
      const { name, price } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price },
        { new: true },
      );
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy sản phẩm" });
      }
      res.json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Xoá product
  deleteProduct: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Không có quyền" });
      }
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },
};

module.exports = productController;
