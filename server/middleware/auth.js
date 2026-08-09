const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const config = require("../config");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// Protect: verify Bearer token and load the admin onto req.admin
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Not authorized. No token provided.", 401);
  }

  const decoded = jwt.verify(token, config.jwtSecret);

  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin) {
    throw new AppError(
      "Not authorized. Account no longer exists.",
      401
    );
  }

  req.admin = admin;
  next();
});

// Authorize: restrict to a set of roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
