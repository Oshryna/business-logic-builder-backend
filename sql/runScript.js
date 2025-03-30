const sql = require("mssql");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function runScript(scriptPath) {
  try {
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    };

    console.log(`Connecting to database: ${config.server}/${config.database}`);
    const pool = await sql.connect(config);

    const scriptFullPath = path.resolve(scriptPath);
    const scriptContent = fs.readFileSync(scriptFullPath, "utf8");

    console.log(`Running script: ${scriptPath}`);
    await pool.request().batch(scriptContent);

    console.log("Script executed successfully");
    await sql.close();
  } catch (err) {
    console.error("Error running SQL script:", err);
    process.exit(1);
  }
}

module.exports = {
  run: runScript
};

// If called directly
if (require.main === module) {
  const scriptPath = process.argv[2];
  if (!scriptPath) {
    console.error("Please provide a script path");
    process.exit(1);
  }
  runScript(scriptPath);
}
