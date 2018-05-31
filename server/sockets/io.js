const auth = require("socketio-auth");
const socketIO = require("socket.io");

const authenticate = require("./utilities/authenticate");
const Users = require("./users");

module.exports = server => {
  const io = socketIO(server);

  const users = new Users();
  io.users = users;

  auth(io, {
    authenticate: async (socket, data, callback) => {
      await authenticate.authenticate(socket, data, callback);
    },
    postAuthenticate: async (socket, data) => {
      await authenticate.postAuthenticate(socket, data, io);
    },
    disconnect: async socket => {
      await authenticate.disconnect(socket, io);
    }
  });

  io.on("connection", socket => {
    console.log("User connected");
    socket.on("disconnect", function() {
      console.log("User disconnected");
    });
  });

  return io;
};
