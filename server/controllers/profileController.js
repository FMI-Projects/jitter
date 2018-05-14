const Profile = require("../data/models/profile");
const Post = require("../data/models/post");

const getProfilePosts = async (req, res) => {
  try {
    const posts = await Post.findProfilePosts(req.params.id);

    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getProfileInfo = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      res.status(404).send();
    }

    res.status(200).send(profile);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  getProfilePosts,
  getProfileInfo
};
