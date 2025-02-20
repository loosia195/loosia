// models/order.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [orderItemSchema],
    totalPrice: { type: Number, default: 0 },
    status: { type: String, default: "pending" }, // pending, confirmed, shipped, done, canceled...
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
