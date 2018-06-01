const eventTypes = require("../events/eventTypes");

module.exports = io => {
  return {
    sendFriendRequest: (userId, friendship) => {
      const socketId = io.users.getUserSocketId(userId);

      if (socketId) {
        io
          .to(socketId)
          .emit(eventTypes.USER_PROFILE_ADD_FRIENDSHIP, { friendship });
      }
    },
    updateFriendRequest: (userId, friendship) => {
      const socketId = io.users.getUserSocketId(userId);

      if (socketId) {
        io
          .to(socketId)
          .emit(eventTypes.USER_PROFILE_UPDATE_FRIENDSHIP, { friendship });
      }
    },
    deleteFriendRequest: (userId, withId) => {
      const socketId = io.users.getUserSocketId(userId);

      if (socketId) {
        io.to(socketId).emit(eventTypes.USER_PROFILE_DELETE_FRIENDSHIP, {
          profileId: withId
        });
      }
    }
  };
};
