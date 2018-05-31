const eventTypes = require("../events/eventTypes");

module.exports = io => {
  io.sendFriendRequest = (userId, friendship) => {
    const socketId = io.users.getUserSocketId(userId);

    if (userId) {
      io
        .to(socketId)
        .emit(eventTypes.USER_PROFILE_ADD_FRIENDSHIP, { friendship });
    }
  };
  io.updateFriendRequest = (userId, friendship) => {
    const socketId = io.users.getUserSocketId(userId);

    if (userId) {
      io
        .to(socketId)
        .emit(eventTypes.USER_PROFILE_UPDATE_FRIENDSHIP, { friendship });
    }
  };
  io.deleteFriendRequest = (userId, withId) => {
    const socketId = io.users.getUserSocketId(userId);

    if (userId) {
      io
        .to(socketId)
        .emit(eventTypes.USER_PROFILE_DELETE_FRIENDSHIP, { profileId: withId });
    }
  };
};
