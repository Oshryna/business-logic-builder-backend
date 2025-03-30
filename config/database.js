const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbHost = process.env.DB_SERVER;
const database = process.env.DB_NAME;
const dbUserName = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbTrustServerCertificate = Boolean(process.env.DB_TrustServerCertificate);

const sequelize = new Sequelize(database, dbUserName, dbPass, {
  host: dbHost,
  dialect: "mssql",
  logging: false, // Set to true for debugging queries
  dialectOptions: {
    options: {
      encrypt: true, // Use encryption
      trustServerCertificate: dbTrustServerCertificate // For local development, set to false in production
    }
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection to SQL Server has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = { sequelize, testConnection };
