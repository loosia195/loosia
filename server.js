// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware auth
const auth = require('./middlewares/auth');

const app = express();
const PORT = 3000;

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/loosia', {})
  .then(() => {
    console.log('Kết nối MongoDB thành công!');
  })
  .catch((err) => {
    console.error('Kết nối MongoDB thất bại:', err);
  });

// Parse JSON
app.use(express.json());

// Phục vụ file tĩnh
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
-------------------------------*/
const User = require('./models/user');

/*------------------------------
  MODEL: Cart
-------------------------------*/
const Cart = require('./models/cart');

/*------------------------------
  GET /api/products
-------------------------------*/
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  POST /api/products (add)
  (Cần token + admin)
-------------------------------*/
app.post('/api/products', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  PUT /api/products/:id (update)
  (Cần token + admin)
-------------------------------*/
app.put('/api/products/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { id } = req.params;
    const { name, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  DELETE /api/products/:id
  (Cần token + admin)
-------------------------------*/
app.delete('/api/products/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  POST /api/register (nhận role từ body)
-------------------------------*/
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username đã tồn tại' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'admin'
    });
    await newUser.save();
    res.json({
      success: true,
      user: { username: newUser.username, role: newUser.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  POST /api/login
-------------------------------*/
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Sai username hoặc password' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Sai username hoặc password' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      'SECRET_KEY',
      { expiresIn: '1d' }
    );
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  GET /api/users (chỉ admin)
-------------------------------*/
app.get('/api/users', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  DELETE /api/users/:id (chỉ admin)
-------------------------------*/
app.delete('/api/users/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  PUT /api/users/:id (chỉ admin) => đổi role
-------------------------------*/
app.put('/api/users/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy user' });
    }
    const userToReturn = {
      _id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role
    };
    res.json({ success: true, user: userToReturn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  POST /api/cart (thêm sản phẩm vào giỏ)
  => Bước 7.2
-------------------------------*/
app.post('/api/cart', auth, async (req, res) => {
  try {
    // userId từ token
    const userId = req.user.userId;

    // Lấy productId, quantity từ body
    const { productId, quantity } = req.body;

    // Tìm cart của user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Chưa có cart => tạo mới
      cart = new Cart({ user: userId, items: [] });
    }

    // Kiểm tra xem items đã có product này chưa
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Đã có => tăng quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // Chưa có => push
      cart.items.push({
        product: productId,
        quantity: quantity || 1
      });
    }

    // Lưu cart
    await cart.save();

    // Populate để trả về thông tin product
    await cart.populate('items.product');

    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

/*------------------------------
  Lắng nghe cổng
-------------------------------*/
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
