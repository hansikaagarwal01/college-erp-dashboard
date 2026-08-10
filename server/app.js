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
const userRoutes = require("./routes/userRoutes");
const auditRoutes = require("./routes/auditRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const fileRoutes = require("./routes/fileRoutes");
const feeRoutes = require("./routes/feeRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const exportRoutes = require("./routes/exportRoutes");
const admissionRoutes = require("./routes/admissionRoutes");

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

// API Routes (versioned)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/audit", auditRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/exams", examRoutes);
app.use("/api/v1/results", resultRoutes);
app.use("/api/v1/timetable", timetableRoutes);
app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/fees", feeRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/export", exportRoutes);
app.use("/api/v1/admissions", admissionRoutes);

// 404 + central error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
