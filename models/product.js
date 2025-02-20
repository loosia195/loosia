// models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: String, default: 'general' },
  imageURL: { type: String }

});

module.exports = mongoose.model("Product", productSchema);
