const winston = require("winston");
const { format, transports } = winston;
require("winston-daily-rotate-file");

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }), // Log stack traces
  format.splat(),
  format.json()
);

// Configure daily rotating file transport
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  zippedArchive: true,
  level: "info" // Logs only 'info' and more severe levels
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info", // Default log level
  format: logFormat,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()) // Colored logs in console
    }),
    fileRotateTransport // Logs to files
  ]
});

// Export the logger instance
module.exports = logger;
