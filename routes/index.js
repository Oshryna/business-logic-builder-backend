const express = require("express");
const router = express.Router();

// Import all route modules
const userRoutes = require("./userRoutes");

// Register route modules
router.use("/users", userRoutes);

// Default route
router.get("/", (req, res) => {
  req.logger.info("API root accessed");
  res.json({ message: "API is running" });
});

module.exports = router;
