// models/cart.js
const mongoose = require('mongoose');

/*
  Cấu trúc giỏ hàng:
  - user: user sở hữu giỏ
  - items: danh sách sản phẩm trong giỏ
    * product: tham chiếu đến Product
    * quantity: số lượng
*/
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  items: [cartItemSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
