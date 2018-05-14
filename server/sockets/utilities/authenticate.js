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

const postAuthenticate = (socket, data, users) => {
  const userId = data.userId;
  users.addUser(userId, socket.id);
};

const disconnect = (socket, users) => {
  users.removeUser(socket.id);
};

module.exports = {
  authenticate,
  postAuthenticate,
  disconnect
};
