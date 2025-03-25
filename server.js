const express = require("express");
const cors = require("cors");
const logger = require("./helper/logger");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const rulesRouter = require("./routes/rules");
const evaluateRouter = require("./routes/evaluate");
const sampleRouter = require("./routes/sample");
const saveLogicRouter = require("./routes/saveLogic");
const ruleListRouter = require("./routes/ruleList");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/rules", rulesRouter);
app.use("/api/ruleList", ruleListRouter);
app.use("/api/evaluate", evaluateRouter);
app.use("/api/sample", sampleRouter);
app.use("/api/saveLogic", saveLogicRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
