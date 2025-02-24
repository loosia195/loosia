// controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Tất cả hàm xử lý user
const userController = {
  // Đăng ký
  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Username đã tồn tại" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        role: role || "admin",
      });
      await newUser.save();
      res.json({
        success: true,
        user: { username: newUser.username, role: newUser.role },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Đăng nhập
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Sai username hoặc password" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ success: false, message: "Sai username hoặc password" });
      }
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" },
      );
      res.json({ success: true, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Lấy danh sách user (chỉ admin)
  getUsers: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Không có quyền" });
      }
      const users = await User.find().select("-password");
      res.json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Xoá user (chỉ admin)
  deleteUser: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Không có quyền" });
      }
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Cập nhật role user (chỉ admin)
  updateUserRole: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "Không có quyền" });
      }
      const { id } = req.params;
      const { role } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true },
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy user" });
      }
      const userToReturn = {
        _id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
      };
      res.json({ success: true, user: userToReturn });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },
};

module.exports = userController;
