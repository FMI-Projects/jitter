const mongoose = require("mongoose");

const commentConstants = require("../../utilities/constants/commentConstants");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: commentConstants.content.maxLenghth
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "Profile"
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: "Post"
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

CommentSchema.statics.findPostComments = async function(postId) {
  const Comment = this;

  const comments = await Comment.find({ post: postId }).populate(
    "author",
    "_id firstName lastName profilePictureUrl"
  );

  if (!comments) {
    return Promise.reject();
  }

  return comments;
};

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
