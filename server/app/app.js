const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("../routes/authRouter");
const profileRouter = require("../routes/profileRouter");

const app = express();

const corsOptions = {
  exposedHeaders: ["x-auth"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/api/profile", profileRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Started on port", port);
});

module.exports = app;
