const eventTypes = require("../events/eventTypes");

module.exports = io => {
  return {
    sendFriendRequest: (userId, friendship) => {
      const socketIds = io.users.getUserSocketIds(userId);

      if (socketIds) {
        for (const socketId of socketIds) {
          io
            .to(socketId)
            .emit(eventTypes.USER_PROFILE_ADD_FRIENDSHIP, { friendship });
        }
      }
    },
    updateFriendRequest: (userId, friendship) => {
      const socketIds = io.users.getUserSocketIds(userId);

      if (socketIds) {
        for (const socketId of socketIds) {
          io
            .to(socketId)
            .emit(eventTypes.USER_PROFILE_UPDATE_FRIENDSHIP, { friendship });
        }
      }
    },
    deleteFriendRequest: (userId, withId) => {
      const socketIds = io.users.getUserSocketIds(userId);

      if (socketIds) {
        for (const socketId of socketIds) {
          io.to(socketId).emit(eventTypes.USER_PROFILE_DELETE_FRIENDSHIP, {
            profileId: withId
          });
        }
      }
    }
  };
};
