const auth = require("socketio-auth");

const authenticate = require("./utilities/authenticate");
const Users = require("./users");

module.exports = io => {
  const users = new Users();
  io.users = users;

  auth(io, {
    authenticate: async (socket, data, callback) => {
      await authenticate.authenticate(socket, data, callback);
    },
    postAuthenticate: async (socket, data) => {
      await authenticate.postAuthenticate(socket, data, users);
    },
    disconnect: async socket => {
      await authenticate.disconnect(socket, users);
    }
  });

  io.on("connection", socket => {
    console.log("User connected");

    socket.on("disconnect", function() {
      console.log("User disconnected");
    });
  });
};
