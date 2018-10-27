const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const commentConstants = require("../../utilities/constants/commentConstants");
const validationMessages = require("../../utilities/validation/messages");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, validationMessages.required("Content")],
      trim: true,
      maxLength: [
        commentConstants.content.maxLenghth,
        validationMessages.maxLength(
          "Comment",
          commentConstants.content.maxLength
        )
      ]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, validationMessages.required("Author")],
      index: true,
      ref: "Profile"
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, validationMessages.required("Post")],
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

  return comments;
};

if (process.env.NODE_ENV !== "test") {
  CommentSchema.plugin(idValidator);
}

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
