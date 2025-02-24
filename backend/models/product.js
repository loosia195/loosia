// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  // Từ imageURL (string) => imageURLs (mảng)
  imageURLs: [String], 
  // ...
});

module.exports = mongoose.model('Product', productSchema);
