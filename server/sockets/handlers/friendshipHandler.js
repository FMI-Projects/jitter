const eventTypes = require("../events/eventTypes");
const Profile = require("../../data/models/profile");

module.exports = (io, socket) => {
  return {
    markFriendshipsAsSeen: () => {
      socket.on(eventTypes.USER_PROFILE_MARK_FRIENDSHIPS_SEEN, async () => {
        const userId = io.users.getUserUserId(socket.id);

        if (userId) {
          await Profile.markFriendRequestsAsSeen(userId);
        }
      });
    }
  };
};
