const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const postConstants = require("../../utilities/constants/postConstants");
const validationMessages = require("../../utilities/validation/messages");

const Comment = require("./comment");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, validationMessages.required("Title")],
      trim: true,
      minlength: [
        postConstants.title.minLength,
        validationMessages.minLength("Title", postConstants.title.minLength)
      ],
      maxlength: [
        postConstants.title.maxLength,
        validationMessages.maxLength("Title", postConstants.title.maxLength)
      ]
    },
    content: {
      type: String,
      trim: true,
      default: null,
      maxlength: [
        postConstants.content.maxLength,
        validationMessages.maxLength("Content", postConstants.content.maxLength)
      ]
    },
    imageUrl: {
      type: String,
      default: null
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

PostSchema.pre("remove", async function(next) {
  const post = this;

  await Comment.remove({ post: post._id });

  next();
});

PostSchema.statics.findProfilePosts = async function(profileId) {
  const Post = this;

  const posts = await Post.find({ author: profileId }).sort({
    createdAt: "descending"
  });

  return posts;
};

if (process.env.NODE_ENV !== "test") {
  PostSchema.plugin(idValidator);
}

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
