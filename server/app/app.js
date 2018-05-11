const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("../routes/authRouter");
const userProfileRouter = require("../routes/userProfileRouter");
const profileRouter = require("../routes/profileRouter");
const postRouter = require("../routes/postRouter");
const commentRouter = require("../routes/commentRouter");
const imageRouter = require("../routes/imageRouter");

const app = express();
const server = http.createServer(app);
app.io = socketIO(server);

const corsOptions = {
  exposedHeaders: ["x-auth"]
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/profile", userProfileRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/images", imageRouter);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT;
  server.listen(port, () => {
    console.log("Started on port", port);
  });
}

module.exports = app;
