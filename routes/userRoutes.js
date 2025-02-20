// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

/*
  * CHÍNH SÁCH:
  * 1) Đăng ký user => public (hoặc admin-only, tuỳ anh).
  * 2) GET user list => chỉ admin => role='admin'.
  * 3) DELETE user => chỉ admin => role='admin'.
  * 4) UPDATE user role => chỉ admin => role='admin'.
*/

// 1) Đăng ký user (public):
//    Nếu anh muốn chỉ admin được tạo user, thì thêm checkRole(['admin']).
router.post('/register', userController.register);

// 2) Đăng nhập user (public):
router.post('/login', userController.login);

// 3) GET user list => chỉ admin
router.get('/', auth, checkRole(['admin']), userController.getUsers);

// 4) DELETE user => chỉ admin
router.delete('/:id', auth, checkRole(['admin']), userController.deleteUser);

// 5) UPDATE user role => chỉ admin
router.put('/:id', auth, checkRole(['admin']), userController.updateUserRole);

module.exports = router;
