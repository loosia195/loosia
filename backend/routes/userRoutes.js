// routes/userRoutes.js

//--------------------------------------------------
// 1) IMPORT
//--------------------------------------------------
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

// **Thiếu import model User => Thêm:
const User = require('../models/user');

// 2) CREATE ROUTER
//--------------------------------------------------
const router = express.Router();

/*
  CHÍNH SÁCH:
  1) Đăng ký user => public (hoặc admin-only, tuỳ anh).
  2) GET user list => chỉ admin => role='admin'.
  3) DELETE user => chỉ admin => role='admin'.
  4) UPDATE user role => chỉ admin => role='admin'.
*/

// 3) ROUTES
//--------------------------------------------------

// a) Đăng ký user (public)
router.post('/register', userController.register);

// b) Đăng nhập user (public)
router.post('/login', userController.login);

// c) GET user list => chỉ admin
router.get('/', auth, checkRole(['admin']), userController.getUsers);

// d) DELETE user => chỉ admin
router.delete('/:id', auth, checkRole(['admin']), userController.deleteUser);

// e) UPDATE user role => chỉ admin
router.put('/:id', auth, checkRole(['admin']), userController.updateUserRole);

// f) Lấy thông tin user đang đăng nhập
router.get('/me', auth, async (req, res) => {
  try {
    // req.user.userId được gắn bởi middleware auth (decode JWT)
    const userId = req.user.userId;

    // Tìm user trong DB
    const user = await User.findById(userId).select('-password'); // ẩn password
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// 4) EXPORT
//--------------------------------------------------
module.exports = router;