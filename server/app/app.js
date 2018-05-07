const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("../routes/authRouter");
const profileRouter = require("../routes/profileRouter");
const postRouter = require("../routes/postRouter");
const commentRouter = require("../routes/commentRouter");

const app = express();

const corsOptions = {
  exposedHeaders: ["x-auth"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log("Started on port", port);
  });
}

module.exports = app;
