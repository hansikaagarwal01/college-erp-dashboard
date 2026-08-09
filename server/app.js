const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const config = require("./config");
const { generalLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10kb" }));

// Rate limiting for all API routes
app.use("/api", generalLimiter);

// Home Route
app.get("/", (req, res) => {
  res.send("College ERP Backend is Running 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 + central error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
