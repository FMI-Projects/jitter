const eventTypes = require("../events/eventTypes");
const Profile = require("../../data/models/profile");

module.exports = io => {
  const addOnlineFriend = (profileId, profileInfo) => {
    const socketIds = io.users.getUserSocketIds(profileId);

    if (socketIds.length > 0) {
      return false;
    }

    for (const friendSocketId of socketIds) {
      io.to(friendSocketId).emit(eventTypes.ONLINE_FRIENDS_ADD, {
        friend: {
          _id: profileInfo._id,
          firstName: profileInfo.firstName,
          lastName: profileInfo.lastName,
          profilePictureUrl: profileInfo.profilePictureUrl
        }
      });
    }

    return true;
  };

  const removeOnlineFriend = (profileId, friendId) => {
    const socketIds = io.users.getUserSocketIds(profileId);

    for (const friendSocketId of socketIds) {
      io.to(friendSocketId).emit(eventTypes.ONLINE_FRIENDS_REMOVE, {
        profileId: friendId
      });
    }
  };

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
        const isFriendOnline = addOnlineFriend(friendId, profileInfo);
        if (isFriendOnline) {
          onlineFriends.push(friendId);
        }
      }

      const onlineFriendsInfo = profileInfo.friendships
        .filter(f =>
          onlineFriends.some(ofr => ofr === f.with._id.toHexString())
        )
        .map(f => f.with);

      io.to(socketId).emit(eventTypes.ONLINE_FRIENDS_SET, {
        onlineFriends: onlineFriendsInfo
      });
    },
    userOnOffline: async profileId => {
      const profileFriendIds = await Profile.getFriendIds(profileId);

      for (const friendId of profileFriendIds) {
        removeOnlineFriend(friendId, profileId);
      }
    }
  };
};
