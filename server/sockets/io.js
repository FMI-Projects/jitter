const auth = require("socketio-auth");
const socketIO = require("socket.io");

const SocketError = require("../exceptions/serverErrors/socketError");
const authenticate = require("./utilities/authenticate");
const Users = require("./users");

const attachEmitters = require("./emitters");
const attachHandlers = require("./handlers");

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

  ioInstance = new Proxy(io, {
    get: function(target, property) {
      return target[property] || emitters[property];
    }
  });

  io.users = new Users();

  auth(io, {
    authenticate: async (socket, data, callback) => {
      await authenticate.authenticate(socket, data, callback);
    },
    postAuthenticate: async (socket, data) => {
      await authenticate.postAuthenticate(socket, data, ioInstance);
    },
    disconnect: async socket => {
      await authenticate.disconnect(socket, ioInstance);
    },
    timeout: 10000
  });

  io.on("connection", socket => {
    attachHandlers(io, socket);

    console.log("User connected");
    socket.on("disconnect", function() {
      console.log("User disconnected");
    });
  });

  const emitters = attachEmitters(io);
};

module.exports = {
  initialize,
  getInstance
};
