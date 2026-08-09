const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyRefreshToken,
} = require("../utils/token");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { STAFF_ROLES } = require("../config/roles");

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
});

// Persist the hashed refresh token + its expiry derived from the JWT
const saveRefreshToken = async (userId, token) => {
  const decoded = jwt.decode(token);
  const expiresAt = decoded && decoded.exp
    ? new Date(decoded.exp * 1000)
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await User.updateOne(
    { _id: userId },
    {
      $set: {
        refreshToken: hashToken(token),
        refreshTokenExpiresAt: expiresAt,
      },
    }
  );
};

const issueTokens = (user) => ({
  accessToken: generateAccessToken(user._id),
  refreshToken: generateRefreshToken(user._id),
});

// Register a new user account (restricted to admin staff)
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new AppError("User already exists", 409);
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: toPublicUser(user),
  });
});

// Login — issue access + refresh tokens
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== "Active") {
    throw new AppError("Account is disabled. Contact your administrator.", 401);
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const { accessToken, refreshToken } = issueTokens(user);
  await saveRefreshToken(user._id, refreshToken);

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    data: toPublicUser(user),
  });
});

// Refresh — rotate the refresh token and issue a new access token
const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (err) {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await User.findById(decoded.id).select(
    "+refreshToken +refreshTokenExpiresAt"
  );

  if (!user || user.status !== "Active") {
    throw new AppError("Invalid refresh token", 401);
  }

  const storedHash = hashToken(refreshToken);
  const expired =
    user.refreshTokenExpiresAt && user.refreshTokenExpiresAt.getTime() < Date.now();

  if (!user.refreshToken || user.refreshToken !== storedHash || expired) {
    // Reused or stale refresh token → invalidate all sessions
    await User.updateOne(
      { _id: user._id },
      { $set: { refreshToken: null, refreshTokenExpiresAt: null } }
    );
    throw new AppError("Invalid refresh token. Please log in again.", 401);
  }

  const { accessToken, refreshToken: newRefreshToken } = issueTokens(user);
  await saveRefreshToken(user._id, newRefreshToken);

  res.status(200).json({
    success: true,
    message: "Token refreshed",
    accessToken,
    refreshToken: newRefreshToken,
    data: toPublicUser(user),
  });
});

// Logout — revoke the refresh token (stateless access token expires on its own)
const logout = asyncHandler(async (req, res) => {
  await User.updateOne(
    { _id: req.user._id },
    { $set: { refreshToken: null, refreshTokenExpiresAt: null } }
  );

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Current authenticated user
const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: toPublicUser(req.user),
  });
});

// Roles an admin may create through the register endpoint
const canAssignRole = (role) => STAFF_ROLES.includes(role);

module.exports = {
  registerUser,
  canAssignRole,
  login,
  refresh,
  logout,
  me,
};
