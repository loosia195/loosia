// controllers/cartController.js
const Cart = require("../models/cart");
const Order = require("../models/order");

const cartController = {
  // Thêm sản phẩm vào giỏ
  addToCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId, quantity } = req.body;

      // Tìm cart theo user
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        // Nếu chưa có cart => tạo mới
        cart = new Cart({ user: userId, items: [] });
      }

      // Kiểm tra sản phẩm đã có trong cart chưa
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        // Đã có => tăng số lượng
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        // Chưa có => push item mới
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
        });
      }

      // Lưu cart
      await cart.save();
      // Populate để trả về thông tin product
      await cart.populate("items.product");

      res.json({ success: true, cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Xem giỏ hàng
  getCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product",
      );
      if (!cart) {
        return res.json({ success: true, cart: { items: [] } });
      }
      res.json({ success: true, cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Xoá 1 sản phẩm khỏi giỏ
  removeItem: async (req, res) => {
    try {
      const userId = req.user.userId;
      const productId = req.params.productId;

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.json({ success: true, cart: { items: [] } });
      }

      // Filter bỏ item có productId
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );

      await cart.save();
      await cart.populate("items.product");

      res.json({ success: true, cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Checkout => Tạo Order, trống giỏ
  checkout: async (req, res) => {
    try {
      const userId = req.user.userId;

      // Tìm cart, populate product để tính giá
      let cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Cart is empty" });
      }

      // Tính tổng tiền
      let totalPrice = 0;
      cart.items.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
      });

      // Tạo đơn hàng (Order)
      const newOrder = new Order({
        user: userId,
        items: cart.items.map((item) => ({
          product: item.product._id, // product ID
          quantity: item.quantity,
        })),
        totalPrice,
        status: "pending", // chờ xác nhận
      });
      await newOrder.save();

      // Trống giỏ
      cart.items = [];
      await cart.save();

      // Trả về order
      res.json({ success: true, order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

module.exports = cartController;
