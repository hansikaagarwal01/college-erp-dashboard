const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { generateToken } = require("../utils/token");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const toPublicAdmin = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email,
  role: admin.role,
});

// Register Admin (protected: Admin only)
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    throw new AppError("Admin already exists", 409);
  }

  const admin = await Admin.create({ name, email, password, role });

  const token = generateToken(admin._id);

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    token,
    data: toPublicAdmin(admin),
  });
});

// Login Admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(admin._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: toPublicAdmin(admin),
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
};
