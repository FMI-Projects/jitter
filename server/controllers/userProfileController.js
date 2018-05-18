const Profile = require("../data/models/profile");

const getCurrentUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const profile = await Profile.getUserProfileInfo(userId);

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const updateCurrentUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    // eslint-disable-next-line no-unused-vars
    const { friendships, ...body } = req.body;

    const profile = await Profile.findByIdAndUpdate(
      userId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).send("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const sendFriendRequest = async (req, res, next) => {
  const userId = req.user._id;
  const requestedProfileId = req.body.profileId;

  if (userId === requestedProfileId) {
    return res.status(400).send("Cannot send a friend request to self");
  }

  try {
    await Profile.sendFriendRequest(userId, requestedProfileId);
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

const updateFriendRequest = async (req, res, next) => {
  const userId = req.user._id;
  const requestedProfileId = req.params.id;

  if (userId === requestedProfileId) {
    return res.status(400).send("Cannot send a friend request to self");
  }

  try {
    await Profile.updateFriendRequest(
      userId,
      requestedProfileId,
      req.body.status
    );
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  sendFriendRequest,
  updateFriendRequest
};
