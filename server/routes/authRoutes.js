const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const { ROLES } = require("../config/roles");
const {
  registerSchema,
  loginSchema,
} = require("../validators/authValidator");

const router = express.Router();

// Public
router.post("/login", authLimiter, validate(loginSchema), loginAdmin);

// Admin only (seed the first admin via: npm run seed:admin)
router.post(
  "/register",
  protect,
  authorize(ROLES.ADMIN),
  validate(registerSchema),
  registerAdmin
);

module.exports = router;
