const Post = require("../data/models/post");

const getProfilePosts = async (req, res) => {
  try {
    const posts = await Post.findProfilePosts(req.params.id);

    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  getProfilePosts
};
