const { sequelize } = require("./config/database");
const BusinessLogic = require("./models/BusinessLogic");

(async () => {
  try {
    await sequelize.sync({ alter: true }); // `alter: true` adjusts table structure safely
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  } finally {
    await sequelize.close();
  }
})();
