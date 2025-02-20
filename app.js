// app.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const winston = require('winston');

// Gọi dotenv.config() sớm
dotenv.config();


// Middleware auth (nếu app.js cần)
const auth = require("./middlewares/auth");

// app.js
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Kết nối DB (chuyển từ server.js)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/loosia';
mongoose
  .connect("mongodb://localhost:27017/loosia", {})
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
  .catch((err) => {
    console.error("Kết nối MongoDB thất bại:", err);
  });


// Dùng Helmet => bảo vệ header
app.use(helmet());

// Rate limit => 100 request / 15 phút
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // giới hạn 100 request
  message: 'Too many requests, please try again later'
  });
  app.use(xss()); // chèn xss-clean
  app.use(limiter);

// Parse JSON
app.use(express.json());

// Phục vụ file tĩnh
app.use(express.static(path.join(__dirname, "public")));

// Khai báo để truy cập file trong uploads/
app.use('/uploads', express.static('uploads'));

// Gắn routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);


app.use(cors({
  origin: 'http://localhost:3001', // domain cho phép
  methods: ['GET','POST','PUT','DELETE']
  }));

app.use(mongoSanitize());
app.use(morgan('combined')); // log detail

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Xuất app cho server.js dùng
module.exports = app;
