const express = require("express");
const cartController = require("../controllers/cartController");
const auth = require("../middlewares/auth");

const router = express.Router();

// POST / => addToCart
router.post("/", auth, cartController.addToCart);

// GET / => getCart
router.get("/", auth, cartController.getCart);

// DELETE /:productId => removeItem
router.delete("/:productId", auth, cartController.removeItem);

module.exports = router; // <--- QUAN TRỌNG
