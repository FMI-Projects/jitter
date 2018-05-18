const Profile = require("../data/models/profile");
const Post = require("../data/models/post");

const getProfilePosts = async (req, res) => {
  try {
    const posts = await Post.findProfilePosts(req.params.id);

    if (!posts) {
      res.status(404).send("Profile not found");
    }

    res.status(200).send(posts);
  } catch (e) {
    next(e);
  }
};

const getProfileInfo = async (req, res) => {
  try {
    const profile = await Profile.getProfileInfo(req.params.id);

    if (!profile) {
      res.status(404).send("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProfilePosts,
  getProfileInfo
};
