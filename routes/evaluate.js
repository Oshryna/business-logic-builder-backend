const express = require("express");
const logger = require("../helper/logger");
const router = express.Router();
const { evaluateCondition } = require("../helper/evaluateCondition");
// Route to evaluate data against business logic
router.post("/", (req, res) => {
  const { businessLogic, data } = req.body;

  try {
    const result = evaluateCondition(businessLogic, data);
    res.json({ success: true, result });
  } catch (error) {
    logger.error("Error evaluating business logic:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
