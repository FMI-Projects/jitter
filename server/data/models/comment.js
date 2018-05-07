const mongoose = require("mongoose");

const commentConstants = require("../../utilities/commentConstants");

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
      ref: "User"
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

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
