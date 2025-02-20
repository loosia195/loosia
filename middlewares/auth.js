// middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token found" });
    }

    // Giải mã token
    const secretKey = process.env.SECRET_KEY || 'fallback_secret';
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
