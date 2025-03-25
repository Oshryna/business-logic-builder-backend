// Route to save business logic
const express = require("express");
const router = express.Router();
const logger = require("../helper/logger");
const { getBusinessLogics } = require("../services/businessLogicService");

router.get("/", async (req, res) => {
  const logics = await getBusinessLogics();
  logger.info("Business logic list fetched!");
  res.json({ success: true, logics });
});

module.exports = router;
