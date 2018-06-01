const _ = require("lodash");

const Profile = require("../data/models/profile");
const io = require("../sockets/io").getInstance();

const getCurrentUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const profile = await Profile.getUserProfileInfo(userId);

    if (!profile) {
      return res.boom.notFound("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const updateCurrentUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const body = _.omit(req.body, ["_id", "friendships"]);

    const profile = await Profile.findByIdAndUpdate(
      userId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.boom.notFound("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const sendFriendRequest = async (req, res, next) => {
  const userId = req.user._id.toHexString();
  const requestedProfileId = req.body.profileId;

  if (userId === requestedProfileId) {
    return res.boom.badRequest("Cannot send a friend request to self");
  }

  try {
    const [fromProfile, toProfile] = await Profile.getByIds([
      userId,
      requestedProfileId
    ]);

    if (!fromProfile || !toProfile) {
      return res.boom.notFound("Profile does not exist");
    }

    const [
      friendRequestFrom,
      friendRequestTo
    ] = await fromProfile.sendFriendRequest(toProfile);

    io.sendFriendRequest(requestedProfileId, friendRequestTo);
    res.status(200).send(friendRequestFrom);
  } catch (e) {
    next(e);
  }
};

const updateFriendRequest = async (req, res, next) => {
  const userId = req.user._id.toHexString();
  const requestedProfileId = req.params.id;

  if (userId === requestedProfileId) {
    return res.boom.badRequest("Cannot update a friend request with self");
  }

  try {
    const [fromProfile, toProfile] = await Profile.getByIds([
      userId,
      requestedProfileId
    ]);

    if (!fromProfile || !toProfile) {
      return res.boom.notFound("Profile does not exist");
    }

    const action = req.body.action;

    switch (action) {
      case "Accept": {
        const [
          friendRequestFrom,
          friendRequestTo
        ] = await fromProfile.acceptFriendRequest(toProfile);
        io.updateFriendRequest(requestedProfileId, friendRequestTo);
        return res.status(200).send(friendRequestFrom);
      }

      case "Decline": {
        const friendRequestTo = await fromProfile.declineFriendRequest(
          toProfile
        );
        io.updateFriendRequest(requestedProfileId, friendRequestTo);
        return res.status(204).send();
      }

      default:
        return res.boom.badRequest("Invalid action");
    }
  } catch (e) {
    next(e);
  }
};

const deleteFriendRequest = async (req, res, next) => {
  const userId = req.user._id.toHexString();
  const requestedProfileId = req.params.id;

  if (userId === requestedProfileId) {
    return res.boom.badRequest("Cannot delete a friend request with self");
  }

  try {
    const [fromProfile, toProfile] = await Profile.getByIds([
      userId,
      requestedProfileId
    ]);

    if (!fromProfile || !toProfile) {
      return res.boom.notFound("Profile does not exist");
    }

    await fromProfile.deleteFriendRequest(toProfile, req.body.action);
    io.deleteFriendRequest(requestedProfileId, userId);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  sendFriendRequest,
  updateFriendRequest,
  deleteFriendRequest
};
