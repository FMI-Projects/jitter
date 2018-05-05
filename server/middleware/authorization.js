const Post = require("../data/models/post");

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.getById(req.params.id);

    if (post.author.toHexString() !== req.user._id.toHexString()) {
      return res.status(401).send();
    }

    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  isPostAuthor
};
