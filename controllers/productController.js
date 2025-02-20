// controllers/productController.js
const Product = require("../models/product");

// Tất cả hàm xử lý product
const productController = {
  // Lấy danh sách product
  getProducts: async (req, res) => {
    try {
      // Lấy query param
      const { search, minPrice, maxPrice, category, page, limit, sort } =
        req.query;

      // Tạo object filter
      const filter = {};

      // 1) Tìm theo tên (search)
      if (search) {
        // regex, case-insensitive
        filter.name = { $regex: search, $options: "i" };
      }

      // 2) Lọc khoảng giá
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = Number(minPrice);
        }
        if (maxPrice) {
          filter.price.$lte = Number(maxPrice);
        }
      }

      // 3) Lọc category (nếu anh có cột 'category')
      if (category) {
        filter.category = category;
      }

      // 4) Phân trang
      const pageNum = page ? parseInt(page) : 1;
      const limitNum = limit ? parseInt(limit) : 10;
      const skip = (pageNum - 1) * limitNum;

      // 5) Sắp xếp
      // sort=price_asc => { price: 1 }, sort=price_desc => { price: -1 }
      let sortObj = {};
      if (sort === "price_asc") {
        sortObj.price = 1;
      } else if (sort === "price_desc") {
        sortObj.price = -1;
      }

      // 6) Tìm product
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limitNum)
        .sort(sortObj);

      res.json(products); // Hoặc: res.json({ success: true, products });
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

  //Úp ảnh
  uploadImage: async (req, res) => {
    try {
      const { id } = req.params; // productId
      // Tìm product
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      // Multer lưu file => đường dẫn file = req.file.path
      if (!req.file) {
        console.log('No file uploaded => return 400');
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      // Lưu đường dẫn vào product.imageURL (tuỳ cột anh đặt)
      product.imageURL = req.file.path; // or a relative path 'uploads/...'
      await product.save();

      res.json({ success: true, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = productController;
