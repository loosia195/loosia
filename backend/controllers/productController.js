// controllers/productController.js
const Product = require('../models/product');

/**
 * Controller chuyên xử lý CRUD cho Product
 * (Upload ảnh tách riêng trong uploadController, 
 *  nhưng ở create/update vẫn nhận các field mới.)
 */
const productController = {
  /**
   * Lấy danh sách sản phẩm (có thể search, filter, sort, paginate)
   * @route GET /api/product
   * @returns { success, products: [...] }
   */
  getProducts: async (req, res) => {
    try {
      // Lấy query param
      const { search, minPrice, maxPrice, category, page, limit, sort } = req.query;

      // Tạo object filter
      const filter = {};

      // 1) Tìm theo brand/name (search)
      if (search) {
        // regex, case-insensitive => Tìm trong brand hoặc name, tuỳ logic
        // Ở đây ví dụ filter name:
        filter.name = { $regex: search, $options: 'i' };
        // Hoặc: filter.$or = [
        //   { name: { $regex: search, $options: 'i' } },
        //   { brand: { $regex: search, $options: 'i' } }
        // ];
      }

      // 2) Lọc khoảng giá (originalPrice, salePrice... tuỳ logic)
      if (minPrice || maxPrice) {
        filter.originalPrice = {};
        if (minPrice) {
          filter.originalPrice.$gte = Number(minPrice);
        }
        if (maxPrice) {
          filter.originalPrice.$lte = Number(maxPrice);
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

      // 5) Sắp xếp (vd: sort=price_asc => { originalPrice: 1 })
      let sortObj = {};
      if (sort === 'price_asc') {
        sortObj.originalPrice = 1;
      } else if (sort === 'price_desc') {
        sortObj.originalPrice = -1;
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
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  },

  /**
   * Lấy 1 sản phẩm theo id
   * @route GET /api/product/:id
   * @returns { success, product }
   */
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Không tìm thấy sản phẩm' });
      }
      return res.json({ success: true, product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  },

  /**
   * Tạo sản phẩm mới
   * @route POST /api/product
   * Yêu cầu role = admin (tùy logic)
   */
  createProduct: async (req, res) => {
    try {
      // Nếu anh có check role:
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ success: false, message: 'Không có quyền' });
      // }

      // Lấy các field từ body
      const {
        brand,
        category,
        size,
        availability,
        originalPrice,
        salePrice,
        discountInfo,
        estimatedRetailPrice,
        condition,
        conditionDescription,
        itemID,
        material,
        style,
        sizeFit,
        shippingReturns,
        ecoImpact,
        images
      } = req.body;

      // Tạo product mới
      const newProduct = new Product({
        brand,
        category,
        size,
        availability,
        originalPrice,
        salePrice,
        discountInfo,
        estimatedRetailPrice,
        condition,
        conditionDescription,
        itemID,
        material,
        style,
        sizeFit,
        shippingReturns,
        ecoImpact,
        imageURLs: images
      });

      await newProduct.save();
      return res.json({ success: true, product: newProduct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  },

  /**
   * Cập nhật thông tin sản phẩm
   * @route PUT /api/product/:id
   * Yêu cầu role = admin
   */
  updateProduct: async (req, res) => {
    try {
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ success: false, message: 'Không có quyền' });
      // }
      const { id } = req.params;
      const {
        brand,
        category,
        size,
        availability,
        originalPrice,
        salePrice,
        discountInfo,
        estimatedRetailPrice,
        condition,
        conditionDescription,
        itemID,
        material,
        style,
        sizeFit,
        shippingReturns,
        ecoImpact
      } = req.body;

      const updated = await Product.findByIdAndUpdate(
        id,
        {
          brand,
          category,
          size,
          availability,
          originalPrice,
          salePrice,
          discountInfo,
          estimatedRetailPrice,
          condition,
          conditionDescription,
          itemID,
          material,
          style,
          sizeFit,
          shippingReturns,
          ecoImpact
        },
        { new: true }
      );

      if (!updated) {
        return res
          .status(404)
          .json({ success: false, message: 'Không tìm thấy sản phẩm' });
      }
      return res.json({ success: true, product: updated });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  },

  /**
   * Xoá sản phẩm
   * @route DELETE /api/product/:id
   * Yêu cầu role = admin
   */
  deleteProduct: async (req, res) => {
    try {
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ success: false, message: 'Không có quyền' });
      // }
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  },
};

module.exports = productController;
