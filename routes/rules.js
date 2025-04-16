// Route to save business logic
const express = require("express");
const router = express.Router();
// const logger = require("../helper/logger");
const { createBusinessLogic } = require("../services/businessLogicService");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  const { businessLogic } = req.body;
  const rejectId = `{${uuidv4()}}`;
  const logic = await createBusinessLogic(businessLogic, rejectId);
  req.logger.info("Business logic created!");

  res.json({ success: true, logic });
});

module.exports = router;
