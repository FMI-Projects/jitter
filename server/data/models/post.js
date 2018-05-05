const mongoose = require("mongoose");
const validator = require("validator");

const postConstants = require("../../utilities/constants/postConstants");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: postConstants.title.minLength
    },
    content: {
      type: String,
      trim: true,
      default: null
    },
    imageUrl: {
      type: String,
      default: null,
      validate: {
        validator: value => !value || validator.isURL(value),
        message: "{VALUES} is not a valid URL"
      }
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

PostSchema.statics.getById = async function(postId) {
  const Post = this;
  const post = await Post.findById(postId);

  if (!post) {
    return Promise.reject();
  }

  return post;
};

PostSchema.statics.update = async function(postId, data) {
  const Post = this;
  const post = await Post.findByIdAndUpdate(postId, {$set: data}, {new: true});

  if (!post) {
    return Promise.reject();
  }

  return post;
};

PostSchema.statics.delete = async function(postId) {
  const Post = this;
  const post = await Post.findByIdAndRemove(postId);

  if (!post) {
    return Promise.reject();
  }

  return post;
};

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
