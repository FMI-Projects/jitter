const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const validationMessages = require("../../utilities/validation/messages");

const LikeSchema = new mongoose.Schema(
  {
    reaction: {
      type: String,
      trim: true,
      enum: {
        values: ["Like", "Dislike"]
      }
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, validationMessages.required("Post")],
      index: true,
      ref: "Post"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, validationMessages.required("Author")],
      index: true,
      ref: "Profile"
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

LikeSchema.statics.findPostLikes = async function(postId) {
  const Like = this;

  const likes = await Like.find({ post: postId }).populate({
    path: "author",
    select: "_id firstName lastName profilePictureUrl"
  });

  return likes;
};

if (process.env.NODE_ENV !== "test") {
  LikeSchema.plugin(idValidator);
}

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
