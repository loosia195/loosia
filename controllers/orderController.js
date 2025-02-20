// controllers/orderController.js
const Order = require("../models/order");

const orderController = {
  // Lấy danh sách đơn hàng
  getOrders: async (req, res) => {
    try {
      // Nếu user là admin => lấy ALL
      if (req.user.role === "admin") {
        const orders = await Order.find()
          .populate("user", "username role")
          .populate("items.product");
        return res.json({ success: true, orders });
      } else {
        // User thường => chỉ lấy đơn của chính họ
        const orders = await Order.find({ user: req.user.userId })
          .populate("user", "username role")
          .populate("items.product");
        return res.json({ success: true, orders });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Lấy chi tiết 1 đơn hàng
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id)
        .populate("user", "username role")
        .populate("items.product");

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      // Nếu user không phải admin & không phải chủ order => 403
      if (
        req.user.role !== "admin" &&
        order.user._id.toString() !== req.user.userId
      ) {
        return res.status(403).json({
          success: false,
          message: "No permission to view this order",
        });
      }

      res.json({ success: true, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Cập nhật trạng thái đơn (admin)
  updateOrderStatus: async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res
          .status(403)
          .json({ success: false, message: "No permission" });
      }

      const { id } = req.params;
      const { status } = req.body; // pending, confirmed, shipped, done, canceled, etc.

      const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
        .populate("user", "username role")
        .populate("items.product");

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      res.json({ success: true, order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = orderController;
