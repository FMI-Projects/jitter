const Profile = require("../data/models/profile");

const getCurrentUserProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await Profile.getUserProfileInfo(userId);
    res.status(200).send(profile);
  } catch (e) {
    res.status(400).send(e);
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
    res.status(200).send(profile);
  } catch (e) {
    res.status(400).send(e);
  }
};

const sendFriendRequest = async (req, res) => {
  const userId = req.user._id;
  const requestedProfileId = req.body.profileId;

  if (userId === requestedProfileId) {
    res.status(400).send();
  }

  try {
    await Profile.sendFriendRequest(userId, requestedProfileId);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateFriendRequest = async (req, res) => {
  const userId = req.user._id;
  const requestedProfileId = req.params.profileId;

  if (userId === requestedProfileId) {
    res.status(400).send();
  }

  try {
    await Profile.updateFriendRequest(
      userId,
      requestedProfileId,
      req.body.status
    );
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  sendFriendRequest,
  updateFriendRequest
};
