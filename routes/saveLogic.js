const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const { createBusinessLogic } = require("../services/businessLogicService");

router.post("/", async (req, res) => {
  const { businessLogic, data } = req.body;
  const rejectId = `{${uuidv4()}}`;
  const logic = await createBusinessLogic(businessLogic, rejectId);
  res.status(201).json(logic);
});

module.exports = router;
