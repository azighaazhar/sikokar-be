const express = require("express");
const cors = require("cors");
const { loadEnv } = require("./config/env");
const routes = require("./routes");

loadEnv();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
