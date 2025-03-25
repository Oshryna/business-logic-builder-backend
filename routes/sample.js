const express = require("express");
const router = express.Router();
// Route to get sample data for testing
router.get("/", (req, res) => {
  const sampleData = {
    StudySavingFund: {
      id: "123456",
      status: "עצמאי",
      accountnumber: "ACC789"
    },
    VAT_Certificate: {
      id: "123456"
    },
    POA: {
      poatype: "ב2",
      items: [{ accountnumber1: "ACC789", informationonly1: "false" }]
    }
  };

  res.json(sampleData);
});

module.exports = router;
