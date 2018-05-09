const Post = require("../data/models/post");
const Comment = require("../data/models/comment");
const Profile = require("../data/models/profile");

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const profile = await Profile.findByUserId(req.user._id);

    if (post.author.toHexString() !== profile._id.toHexString()) {
      return res.status(401).send();
    }

    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

const isCommentAuthor = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment.author.toHexString() !== req.user._id.toHexString()) {
      return res.status(401).send();
    }

    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports = {
  isPostAuthor,
  isCommentAuthor
};
