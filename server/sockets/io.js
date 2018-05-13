const io = require("../app").io;
const Users = require("./users");

const users = new Users();
io.users = users;

io.on("connection", socket => {
  console.log("User connected");

  socket.on("disconnect", function() {
    console.log("User disconnected");
  });
});

module.exports = io;
