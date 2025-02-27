// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Cấu hình Multer => lưu file vào folder "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = file.fieldname + "-" + Date.now() + ext;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

// POST /api/upload => upload.single('image')
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "No file uploaded" });
  }
  // file đã được lưu => req.file.filename
  // Tạo url => "/uploads/<filename>"
  const url = `/uploads/${req.file.filename}`;
  return res.json({ success: true, url });
});

module.exports = router;

