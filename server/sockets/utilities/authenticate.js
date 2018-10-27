const jwt = require("../../utilities/authToken");
const User = require("../../data/models/user");
const DataNotFoundError = require("../../exceptions/logicErrors/dataNotFoundError");

const authenticate = async (socket, data, callback) => {
  const token = data.token;
  const decodedToken = jwt.decodeJwt(token);

  const userId = decodedToken._id;
  const user = await User.findById(userId);

  if (user) {
    data.userId = userId;
    return callback(null, true);
  } else {
    return callback(new DataNotFoundError("User not found"));
  }
};

const postAuthenticate = (socket, data, io) => {
  const userId = data.userId;
  io.users.addUser(userId, socket.id);

  io.userOnOnline(userId, socket.id);
};

const disconnect = (socket, io) => {
  const userId = io.users.removeUser(socket.id);

  if (userId && !io.users.isUserOnline(userId)) {
    io.userOnOffline(userId);
  }
};

module.exports = {
  authenticate,
  postAuthenticate,
  disconnect
};
