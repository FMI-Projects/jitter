const mongoose = require("mongoose");

const commentConstants = require("../../utilities/constants/commentConstants");
const Post = require("./post");
const Profile = require("./profile");

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

CommentSchema.statics.findPostComments = async function(postId, authorId) {
  const Comment = this;

  const comments = await Comment.find({post: postId});
  const post = await Post.findById(postId);
  const profile = await Profile.findById(authorId);

  if (!comments || !post || !profile) {
    return Promise.reject();
  }

  return {comments, post, author: profile};
};

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
