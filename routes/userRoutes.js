// routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

// Đăng ký
router.post("/register", userController.register);

// Đăng nhập
router.post("/login", userController.login);

// Lấy danh sách user (chỉ admin => auth)
router.get("/", auth, userController.getUsers);

// Xoá user
router.delete("/:id", auth, userController.deleteUser);

// Sửa role user
router.put("/:id", auth, userController.updateUserRole);

module.exports = router;
