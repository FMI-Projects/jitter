const auth = require("socketio-auth");
const socketIO = require("socket.io");

const SocketError = require("../exceptions/socketError");
const authenticate = require("./utilities/authenticate");
const Users = require("./users");

let ioInstance;

const getInstance = () => {
  if (!ioInstance) {
    throw new SocketError("Socket has not been initialized");
  }

  return ioInstance;
};

const initialize = server => {
  if (ioInstance) {
    throw new SocketError("Socket has already been initialized");
  }

  const io = socketIO(server);

  io.users = new Users();

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

  const emitters = require("./emitters")(io);

  ioInstance = new Proxy(io, {
    get: function(target, property) {
      return target[property] || emitters[property];
    }
  });
};

module.exports = {
  initialize,
  getInstance
};
