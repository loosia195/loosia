// app.js
// 1) IMPORT & SETUP
//--------------------------------------------------
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const winston = require("winston");

// 2) LOAD ENV
//--------------------------------------------------
dotenv.config(); // => .env loaded

// 3) CONNECT DB
//--------------------------------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loosia";
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
  .catch((err) => {
    console.error("Kết nối MongoDB thất bại:", err);
  });

// 4) INIT EXPRESS APP
//--------------------------------------------------
const app = express();

// 5) SECURITY & MIDDLEWARES
//--------------------------------------------------
// Helmet => bảo vệ header
app.use(helmet());

// Rate limit => 100 request / 15 phút
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // giới hạn 100 request
  message: "Too many requests, please try again later",
});
app.use(limiter);

// Chống XSS
app.use(xss());

// Chống NoSQL injection
app.use(mongoSanitize());

// parse JSON
app.use(express.json());

// CORS => cho phép domain localhost:3001
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// log detail => morgan
app.use(morgan("combined"));

// 6) WINSTON LOGGER
//--------------------------------------------------
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// 7) STATIC FILES
//--------------------------------------------------
// Phục vụ file tĩnh => backend/public
app.use(express.static(path.join(__dirname, "public")));

// Cho phép truy cập folder uploads
app.use(
  '/uploads',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

// 8) ROUTES
//--------------------------------------------------
const auth = require("./middlewares/auth"); // (nếu app.js cần)
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRouter = require('./controllers/uploadController');
const reviewRoutes = require('./routes/reviewRoutes');


// Dùng payment
app.use("/api/payment", paymentRoutes);
// Dùng user, product, cart, order
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use('/api', uploadRouter);
app.use('/api/product', reviewRoutes);


// 9) EXPORT
//--------------------------------------------------
module.exports = app;

