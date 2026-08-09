const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/database");
const config = require("./config");

// Connect Database
connectDB();

const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    try {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    } catch (error) {
      console.error("Error during shutdown:", error.message);
    }
    process.exit(0);
  });

  // Force exit if shutdown takes too long
  setTimeout(() => {
    console.error("Forced shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
