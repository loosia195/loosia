//--------------------------------------------------
// controllers/uploadController.js
//--------------------------------------------------
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const express = require('express');
const Product = require('../models/product');
const auth = require('../middlewares/auth');

const router = express.Router();

/**
 * 1) Cấu hình Multer
 *    - Lưu file vào thư mục "backend/uploads"
 *    - Tên file = <timestamp>-<random> + extension
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Sử dụng path.join để đảm bảo tương thích đa hệ điều hành
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    // Thêm random suffix để tránh trùng tên file khi upload cùng mili-giây
    const uniqueSuffix = '-' + Math.round(Math.random() * 1e9);
    const fileName = Date.now() + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const upload = multer({ storage });

/**
 * 2) Route upload 1 ảnh (single)
 *    - Giữ cho các trường hợp chỉ cần 1 ảnh
 *    - Xoá ảnh cũ nếu có
 *    - Lưu vào "product.imageURL" (chuỗi)
 */
router.post(
  '/product/:id/uploadImage',
  auth,
  upload.single('image'),
  async (req, res) => {
    try {
      const productId = req.params.id;

      // 2.1) Tìm product
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }

      // 2.2) Xoá ảnh cũ (nếu có) => product.imageURL
      if (product.imageURL) {
        const oldPath = path.join(__dirname, '..', product.imageURL);
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error('Không thể xóa file cũ:', err);
            // Không return lỗi, tiếp tục upload ảnh mới
          }
        });
      }

      // 2.3) Tạo đường dẫn mới => "uploads/filename.jpg"
      let relativePath = path.join('uploads', req.file.filename);
      relativePath = relativePath.replace(/\\/g, '/'); // tránh backslash trên Windows

      // 2.4) Cập nhật DB => Lưu chuỗi vào product.imageURL
      product.imageURL = relativePath;
      await product.save();

      // 2.5) Trả về kết quả
      return res.json({
        success: true,
        message: 'Upload image thành công!',
        product,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: 'Lỗi server khi upload ảnh' });
    }
  }
);

/**
 * 3) Route upload nhiều ảnh (multiple)
 *    - Dành cho trường hợp Product có mảng "imageURLs: [String]"
 *    - Mặc định: "push" thêm ảnh mới vào mảng
 *    - Nếu muốn thay thế toàn bộ, anh có thể:
 *        1) Xoá file cũ => product.imageURLs.forEach(...) fs.unlinkSync(...)
 *        2) product.imageURLs = newImagePaths;
 */
router.post(
  '/product/:id/uploadImages',
  auth,
  upload.array('images', 5), // Cho phép tối đa 5 file 1 lần
  async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }

      // 3.1) Tạo mảng đường dẫn cho ảnh mới => "uploads/filename.jpg"
      const newImagePaths = req.files.map((file) => {
        let relativePath = path.join('uploads', file.filename);
        return relativePath.replace(/\\/g, '/');
      });

      // 3.2) Mặc định: push thêm ảnh mới
      //    => Nếu muốn thay thế toàn bộ, anh comment push và dùng code thay thế
      if (!product.imageURLs) {
        product.imageURLs = [];
      }
      product.imageURLs.push(...newImagePaths);

      // (Nếu thay thế toàn bộ, ví dụ):
      // // Xoá file cũ
      // product.imageURLs.forEach((oldPath) => {
      //   const absPath = path.join(__dirname, '..', oldPath);
      //   if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
      // });
      // // Rồi gán mảng mới
      // product.imageURLs = newImagePaths;

      await product.save();

      return res.json({
        success: true,
        message: 'Upload multiple images thành công!',
        product,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: 'Lỗi server khi upload ảnh' });
    }
  }
);

module.exports = router;