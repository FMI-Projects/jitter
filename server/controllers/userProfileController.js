const Profile = require("../data/models/profile");

const getCurrentUserProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await Profile.getUserProfileInfo(userId);

    if (!profile) {
      res.status(404).send("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const updateCurrentUserProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await Profile.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      res.status(404).send("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const sendFriendRequest = async (req, res) => {
  const userId = req.user._id;
  const requestedProfileId = req.body.profileId;

  if (userId === requestedProfileId) {
    res.status(400).send("Cannot send a friend request to self");
  }

  try {
    await Profile.sendFriendRequest(userId, requestedProfileId);
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

const updateFriendRequest = async (req, res) => {
  const userId = req.user._id;
  const requestedProfileId = req.params.id;

  if (userId === requestedProfileId) {
    res.status(400).send("Cannot send a friend request to self");
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
