const express = require("express");
const {
  registerUser,
  login,
  refresh,
  logout,
  me,
} = require("../controllers/authController");
const { protect, requirePermission } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  refreshSchema,
} = require("../validators/authValidator");

const router = express.Router();

// Public
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh", authLimiter, validate(refreshSchema), refresh);

// Authenticated
router.get("/me", protect, me);
router.post("/logout", protect, logout);

// Admin only (seed the first admin via: npm run seed:admin)
router.post(
  "/register",
  protect,
  requirePermission("users", "write"),
  validate(registerSchema),
  registerUser
);

module.exports = router;
