// server.js
const express = require('express');
const path = require('path');

// Tạo instance app
const app = express();

// Cấu hình cổng
const PORT = 3000;

// Cho phép Express parse dữ liệu JSON (nếu cần nhận dữ liệu POST dạng JSON)
app.use(express.json());

// Phục vụ file tĩnh trong thư mục "public"
// => Bất kỳ file nào trong "public" sẽ truy cập được qua http://localhost:3000/<tên-file>
app.use(express.static(path.join(__dirname, 'public')));

// Route test để kiểm tra server
app.get('/hello', (req, res) => {
  res.send('Xin chào! Server đã chạy OK!');
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
