const Post = require("../data/models/post");
const Comment = require("../data/models/comment");

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.author.toHexString() !== req.user._id.toHexString()) {
      return res.status(401).send();
    }

    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

const isCommentAuthor = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    if (comment.author.toHexString() !== req.user._id.toHexString()) {
      return res.status(401).send();
    }

    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  isPostAuthor,
  isCommentAuthor
};
