// models/cart.js
const mongoose = require("mongoose");

/*
  Cấu trúc giỏ hàng:
  - user: ID của người sở hữu giỏ (tham chiếu đến User)
  - items: Mảng chứa các sản phẩm trong giỏ
    * product: Tham chiếu đến sản phẩm (Product)
    * quantity: Số lượng sản phẩm, mặc định là 1
*/

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
