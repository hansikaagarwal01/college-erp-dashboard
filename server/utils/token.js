const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");

const generateAccessToken = (userId) =>
  jwt.sign({ id: userId, type: "access" }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });

const generateRefreshToken = (userId) =>
  jwt.sign(
    { id: userId, type: "refresh", jti: crypto.randomUUID() },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenExpire }
  );

// Store only a hash of the refresh token server-side
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const verifyAccessToken = (token) => jwt.verify(token, config.jwtSecret);

const verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, config.refreshTokenSecret);
  if (decoded.type !== "refresh") {
    const err = new Error("Invalid token type");
    err.name = "JsonWebTokenError";
    throw err;
  }
  return decoded;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyAccessToken,
  verifyRefreshToken,
};
