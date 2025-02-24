// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  role: { type: String, default: "employee" },
  role: { type: String, default: "customer" },
});

module.exports = mongoose.model("User", userSchema);
