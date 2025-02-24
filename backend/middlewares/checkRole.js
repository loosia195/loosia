// middlewares/checkRole.js
module.exports = function checkRole(allowedRoles) {
    return (req, res, next) => {
      try {
        // req.user do auth.js gán => { userId, role, ... }
        if (!req.user) {
          return res.status(401).json({ success: false, message: 'No user data' });
        }
        const userRole = req.user.role;
        // Nếu mảng allowedRoles chứa userRole => next, else 403
        if (allowedRoles.includes(userRole)) {
          return next();
        } else {
          return res.status(403).json({ success: false, message: 'No permission' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
    };
  };
  