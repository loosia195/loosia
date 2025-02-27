// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: String,
  category: String,
  size: String,
  availability: String,
  originalPrice: Number,
  salePrice: Number,
  discountInfo: String,
  estimatedRetailPrice: Number,
  condition: String,
  conditionDescription: String,
  itemID: String,
  material: String,
  style: String,
  sizeFit: String,
  shippingReturns: String,
  ecoImpact: String,
  imageURLs: [String], 
  // ...
});

module.exports = mongoose.model('Product', productSchema);
