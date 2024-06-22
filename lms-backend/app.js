const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const api = require("./src/api");
const sequelize = require("./src/config/db.config");

app.use(cors());
app.use(express.json());
app.use("/api", api);

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  console.log("Database connected successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
