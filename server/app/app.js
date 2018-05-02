const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("../routes/authRouter");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Started on port", port);
});

module.exports = app;
