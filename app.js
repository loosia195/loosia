// app.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Middleware auth (nếu app.js cần)
const auth = require("./middlewares/auth");

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Kết nối DB (chuyển từ server.js)
mongoose
  .connect("mongodb://localhost:27017/loosia", {})
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
  .catch((err) => {
    console.error("Kết nối MongoDB thất bại:", err);
  });

// Parse JSON
app.use(express.json());

// Phục vụ file tĩnh
app.use(express.static(path.join(__dirname, "public")));

// Gắn routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

// Xuất app cho server.js dùng
module.exports = app;
