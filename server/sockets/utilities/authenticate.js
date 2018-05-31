const jwt = require("../../utilities/authToken");
const User = require("../../data/models/user");

const authenticate = async (socket, data, callback) => {
  const token = data.token;
  const decodedToken = jwt.decodeJwt(token);

  const userId = decodedToken._id;
  const user = await User.findById(userId);

  if (user) {
    data.userId = userId;
    return callback(null, true);
  } else {
    return callback(new Error("User not found"));
  }
};

const postAuthenticate = (socket, data, io) => {
  const userId = data.userId;
  io.users.addUser(userId, socket.id);
};

const disconnect = (socket, io) => {
  io.users.removeUser(socket.id);
};

module.exports = {
  authenticate,
  postAuthenticate,
  disconnect
};
