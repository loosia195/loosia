// routes/userRoutes.js

//--------------------------------------------------
// 1) IMPORT
//--------------------------------------------------
const express = require('express');
const userController = require('../controllers/userController'); // thay "../backend/controllers" => "../controllers"
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

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
//    Nếu anh muốn chỉ admin được tạo user => router.post('/register', auth, checkRole(['admin']), userController.register);
router.post('/register', userController.register);

// b) Đăng nhập user (public)
router.post('/login', userController.login);

// c) GET user list => chỉ admin
router.get('/', auth, checkRole(['admin']), userController.getUsers);

// d) DELETE user => chỉ admin
router.delete('/:id', auth, checkRole(['admin']), userController.deleteUser);

// e) UPDATE user role => chỉ admin
router.put('/:id', auth, checkRole(['admin']), userController.updateUserRole);

// 4) EXPORT
//--------------------------------------------------
module.exports = router;

