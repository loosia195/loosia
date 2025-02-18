// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // Thêm mongoose
const app = express();
const PORT = 3000;

// Kết nối MongoDB (myshop là tên DB)
mongoose.connect('mongodb://localhost:27017/loosia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Kết nối MongoDB thành công!');
}).catch((err) => {
  console.error('Kết nối MongoDB thất bại:', err);
});

// Cho phép parse JSON
app.use(express.json());

// Phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Định nghĩa Schema & Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Product = mongoose.model('Product', productSchema);

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); // Lấy tất cả document
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// POST /api/products
app.post('/api/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save(); // Lưu vào DB
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// DELETE /api/products/:id
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
