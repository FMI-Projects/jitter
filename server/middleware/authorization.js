const Post = require("../data/models/post");
const Comment = require("../data/models/comment");
const Like = require("../data/models/like");

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.boom.notFound("Post not found");
    }

    if (post.author.toHexString() !== req.user._id.toHexString()) {
      return res.boom.forbidden("Forbidden");
    }

    next();
  } catch (e) {
    next(e);
  }
};

const isCommentAuthor = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.boom.notFound("Comment not found");
    }

    if (comment.author.toHexString() !== req.user._id.toHexString()) {
      return res.boom.forbidden("Forbidden");
    }

    next();
  } catch (e) {
    next(e);
  }
};

const isLikeAuthor = async (req, res, next) => {
  try {
    const like = await Like.findOne({
      post: req.params.postId,
      author: req.user._id
    });

    if (!like) {
      return res.boom.forbidden("Forbidden");
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  isPostAuthor,
  isCommentAuthor,
  isLikeAuthor
};
