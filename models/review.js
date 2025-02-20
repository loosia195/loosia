// models/review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, required: true }, // 1->5
    comment: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);
