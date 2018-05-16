const mongoose = require("mongoose");
const validator = require("validator");

const postConstants = require("../../utilities/constants/postConstants");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: postConstants.title.minLength,
      maxlength: postConstants.title.maxLength
    },
    content: {
      type: String,
      trim: true,
      default: null,
      maxlength: postConstants.content.maxLength
    },
    imageUrl: {
      type: String,
      default: null
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

PostSchema.statics.findProfilePosts = async function(profileId) {
  const Post = this;

  const posts = await Post.find({author: profileId});

  if (!posts) {
    return Promise.reject();
  }

  return posts;
};

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
