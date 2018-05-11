const io = require("../app").io;

io.on("connection", socket => {
  console.log("User connected!");
});
