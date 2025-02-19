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
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
