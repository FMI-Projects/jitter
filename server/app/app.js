const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const boom = require("express-boom");

const app = express();
const server = http.createServer(app);

require("../sockets/io").initialize(server);

const authRouter = require("../routes/authRouter");
const userProfileRouter = require("../routes/userProfileRouter");
const profileRouter = require("../routes/profileRouter");
const postRouter = require("../routes/postRouter");
const commentRouter = require("../routes/commentRouter");
const imageRouter = require("../routes/imageRouter");

const errorHandler = require("../middleware/errorHandler");

const corsOptions = {
  exposedHeaders: ["x-auth"]
};

app.use(cors(corsOptions));
app.use(boom());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/profile", userProfileRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/images", imageRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT;
  server.listen(port, () => {
    console.log("Started on port", port);
  });
}

module.exports = app;
