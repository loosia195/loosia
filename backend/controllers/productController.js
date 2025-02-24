// controllers/productController.js
const Product = require("../models/product");

/**
 * Controller chuyên xử lý CRUD cho Product
 * (Phần upload ảnh đã tách riêng trong uploadController.js)
 */
const productController = {
  /**
   * Lấy danh sách sản phẩm (có thể search, filter, sort, paginate)
   * @route GET /api/product
   */
  getProducts: async (req, res) => {
    try {
      // Lấy query param
      const { search, minPrice, maxPrice, category, page, limit, sort } = req.query;

      // Tạo object filter
      const filter = {};

      // 1) Tìm theo tên (search)
      if (search) {
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

      // 3) Lọc category
      if (category) {
        filter.category = category;
      }

      // 4) Phân trang
      const pageNum = page ? parseInt(page) : 1;
      const limitNum = limit ? parseInt(limit) : 10;
      const skip = (pageNum - 1) * limitNum;

      // 5) Sắp xếp (price_asc / price_desc)
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

      // Trả về mảng sản phẩm kèm success: true
      return res.json({ success: true, products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  /**
   * Lấy 1 sản phẩm theo id
   * @route GET /api/product/:id
   */
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
      }
      return res.json({ success: true, product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  /**
   * Tạo sản phẩm mới
   * @route POST /api/product
   * Yêu cầu role = admin
   */
  createProduct: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Không có quyền" });
      }
      const { name, price, category } = req.body;
      const newProduct = new Product({ name, price, category });
      await newProduct.save();
      return res.json({ success: true, product: newProduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  /**
   * Cập nhật thông tin sản phẩm
   * @route PUT /api/product/:id
   * Yêu cầu role = admin
   */
  updateProduct: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Không có quyền" });
      }
      const { id } = req.params;
      const { name, price, category } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, category },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
      }
      return res.json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  /**
   * Xoá sản phẩm
   * @route DELETE /api/product/:id
   * Yêu cầu role = admin
   */
  deleteProduct: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Không có quyền" });
      }
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },
};

module.exports = productController;