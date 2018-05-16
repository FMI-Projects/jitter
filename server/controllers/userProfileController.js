const Profile = require("../data/models/profile");

const getCurrentUserProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await Profile.findById(userId);
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

module.exports = {
  getCurrentUserProfile,
  updateCurrentUserProfile
};
