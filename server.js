// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Thêm để hash mật khẩu

const app = express();
const PORT = 3000;

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/loosia', {
  // useNewUrlParser, useUnifiedTopology đã không còn bắt buộc ở Mongoose v6+
}).then(() => {
  console.log('Kết nối MongoDB thành công!');
}).catch((err) => {
  console.error('Kết nối MongoDB thất bại:', err);
});

// Middleware parse JSON
app.use(express.json());

// Phục vụ file tĩnh (HTML, CSS, JS) trong thư mục "public"
app.use(express.static(path.join(__dirname, 'public')));

/*------------------------------
  MODEL: Product
-------------------------------*/
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Product = mongoose.model('Product', productSchema);

/*------------------------------
  MODEL: User
  (IMPORT TỪ FILE user.js)
-------------------------------*/
const User = require('./models/user');
// => Giả sử file thật là "./models/user.js"

// NẾU anh đặt file là "./models/User.js" (viết hoa U) 
// thì phải thống nhất: const User = require('./models/User');

/*------------------------------
  API Sản Phẩm
-------------------------------*/
// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
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
    await newProduct.save();
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

/*------------------------------
  API Đăng ký (Register)
-------------------------------*/
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra username tồn tại?
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username đã tồn tại' });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user
    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'admin'
    });

    await newUser.save();

    res.json({ success: true, user: { username: newUser.username, role: newUser.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  Cuối cùng: lắng nghe cổng
-------------------------------*/
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


