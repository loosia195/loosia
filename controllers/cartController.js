// controllers/cartController.js
const Cart = require("../models/cart");

const cartController = {
  // Thêm sản phẩm vào giỏ
  addToCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity || 1,
        });
      }

      await cart.save();
      await cart.populate("items.product");

      res.json({ success: true, cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },

  // Xem giỏ
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
      const productId = req.params.productId; // or item id

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.json({ success: true, cart: { items: [] } });
      }

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
};

module.exports = cartController;
