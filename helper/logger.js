const Logger = require("common-logging-service");
// Configure Logger

// Configure Logger
const logger = new Logger({
  serviceName: "backend-api",
  environment: process.env.NODE_ENV || "development",
  sqlConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  }
});

module.exports = logger;
