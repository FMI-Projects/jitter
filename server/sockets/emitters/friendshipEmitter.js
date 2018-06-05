const eventTypes = require("../events/eventTypes");
const Profile = require("../../data/models/profile");

module.exports = io => {
  return {
    sendFriendRequest: (userId, friendship) => {
      const socketIds = io.users.getUserSocketIds(userId);

      for (const socketId of socketIds) {
        io.to(socketId).emit(eventTypes.USER_PROFILE_ADD_FRIENDSHIP, {
          friendship
        });
      }
    },
    updateFriendRequest: (userId, friendship) => {
      const socketIds = io.users.getUserSocketIds(userId);

      for (const socketId of socketIds) {
        io.to(socketId).emit(eventTypes.USER_PROFILE_UPDATE_FRIENDSHIP, {
          friendship
        });
      }
    },
    deleteFriendRequest: (userId, withId) => {
      const socketIds = io.users.getUserSocketIds(userId);

      for (const socketId of socketIds) {
        io.to(socketId).emit(eventTypes.USER_PROFILE_DELETE_FRIENDSHIP, {
          profileId: withId
        });
      }
    },
    userOnOnline: async (profileId, socketId) => {
      const profileInfo = await Profile.getProfileInfo(profileId);

      const profileFriends = profileInfo.friendships.map(f =>
        f.with._id.toHexString()
      );

      const onlineFriends = [];

      for (const friendId of profileFriends) {
        const socketIds = io.users.getUserSocketIds(friendId);

        if (socketIds.length > 0) {
          onlineFriends.push(friendId);
        }

        for (const friendSocketId of socketIds) {
          io.to(friendSocketId).emit(eventTypes.ONLINE_FRIENDS_ADD, {
            _id: profileInfo._id,
            firstName: profileInfo.firstName,
            lastName: profileInfo.lastName,
            profilePictureUrl: profileInfo.profilePictureUrl
          });
        }
      }

      const onlineFriendsInfo = profileInfo.friendships
        .filter(f =>
          onlineFriends.some(ofr => ofr === f.with._id.toHexString())
        )
        .map(f => f.with);

      io.to(socketId).emit(eventTypes.ONLINE_FRIENDS_SET, onlineFriendsInfo);
    },
    userOnOffline: async profileId => {
      const profileInfo = await Profile.getFriendIds(profileId);

      const profileFriendIds = profileInfo.friendships.map(f => f.with.toHexString());

      for (const friendId of profileFriendIds) {
        const socketIds = io.users.getUserSocketIds(friendId);

        for (const friendSocketId of socketIds) {
          io.to(friendSocketId).emit(eventTypes.ONLINE_FRIENDS_REMOVE, {
            profileId
          });
        }
      }
    }
  };
};
