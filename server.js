require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rulesRouter = require("./routes/rules");
const evaluateRouter = require("./routes/evaluate");
const sampleRouter = require("./routes/sample");
const saveLogicRouter = require("./routes/saveLogic");
const ruleListRouter = require("./routes/ruleList");
const Logger = require("common-logging-service");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure Logger
const logger = new Logger({
  serviceName: "backend-api"
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(logger.middleware());
app.use("/api/saveLogic", saveLogicRouter);
// // Import routes
// const routes = require("./routes");

// // API routes
// app.use("/api", routes);

// Frontend logs endpoint
app.post("/api/logs/frontend", (req, res) => {
  const { level, message, contextData, correlationId } = req.body;

  // Validate log level
  const validLevels = ["trace", "debug", "info", "warn", "error", "fatal"];
  const logLevel = validLevels.includes(level) ? level : "info";

  // Use the logger with the appropriate level
  logger[logLevel](
    `[FRONTEND] ${message}`,
    contextData,
    correlationId || req.headers["x-correlation-id"]
  );

  res.status(200).json({ success: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
  req.logger.error("Server error", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

module.exports = app;
