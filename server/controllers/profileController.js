const Profile = require("../data/models/profile");
const Post = require("../data/models/post");

const getProfilePosts = async (req, res, next) => {
  try {
    const posts = await Post.findProfilePosts(req.params.id, req.user._id);

    if (!posts) {
      return res.boom.notFound("Profile not found");
    }

    res.status(200).send(posts);
  } catch (e) {
    next(e);
  }
};

const getProfileInfo = async (req, res, next) => {
  try {
    const profile = await Profile.getProfileInfo(req.params.id);

    if (!profile) {
      return res.boom.notFound("Profile not found");
    }

    res.status(200).send(profile);
  } catch (e) {
    next(e);
  }
};

const searchProfiles = async (req, res, next) => {
  try {
    const searchQuery = req.query.name || "";

    const profiles = await Profile.searchProfiles(searchQuery);

    res.status(200).send(profiles);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProfilePosts,
  getProfileInfo,
  searchProfiles
};
