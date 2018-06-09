const mongoose = require("mongoose");
const idValidator = require("mongoose-id-validator");

const postConstants = require("../../utilities/constants/postConstants");
const validationMessages = require("../../utilities/validation/messages");

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
    },
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

PostSchema.pre("remove", async function(next) {
  const post = this;

  const removeComments = post.model("Comment").remove({ post: post._id });
  const removeLikes = post.model("Like").remove({ post: post._id });

  await Promise.all([removeComments, removeLikes]);

  next();
});

PostSchema.statics.findProfilePosts = async function(profileId, currentUserId) {
  const Post = this;

  let posts = await Post.find({ author: profileId }).sort({
    _id: "descending"
  });

  if (posts.length > 0) {
    posts = await Post.setPostVirtuals(posts, currentUserId);
  }

  return posts;
};

PostSchema.statics.setPostVirtuals = async function(posts, currentUserId) {
  const Post = this;

  const postIds = posts.map(p => p._id);

  const reactionsCount = await Post.getReactionsCount(postIds);
  posts.forEach(p => {
    p.reactionsCount = reactionsCount[p._id.toHexString()];
  });

  const commentsCount = await Post.getCommentsCount(postIds);
  posts.forEach(p => {
    p.commentsCount = commentsCount[p._id.toHexString()];
  });

  const userReactions = await Post.getUserReactions(postIds, currentUserId);
  posts.forEach(p => {
    p.userReaction = userReactions[p._id.toHexString()];
  });

  return posts;
};

PostSchema.statics.getUserReactions = async function(postIds, userId) {
  const Post = this;

  const userReactions = await Post.model("Like")
    .find({
      post: { $in: postIds },
      author: userId
    })
    .select("reaction post");

  const reactionsMap = {};

  userReactions.forEach(r => {
    reactionsMap[r.post.toHexString()] = r.reaction;
  });

  return reactionsMap;
};

PostSchema.statics.getCommentsCount = async function(postIds) {
  const Post = this;

  const commentsCount = await Post.model("Comment").aggregate([
    {
      $match: {
        post: {
          $in: postIds
        }
      }
    },
    {
      $group: {
        _id: {
          post: "$post"
        },
        count: { $sum: 1 }
      }
    }
  ]);

  const commentsMap = {};
  commentsCount.forEach(r => {
    const postId = r._id.post.toHexString();

    commentsMap[postId] = r.count;
  });

  return commentsMap;
};

PostSchema.statics.getReactionsCount = async function(postIds) {
  const Post = this;

  const reactionsCount = await Post.model("Like").aggregate([
    {
      $match: {
        post: {
          $in: postIds
        }
      }
    },
    {
      $group: {
        _id: {
          post: "$post",
          reaction: "$reaction"
        },
        count: { $sum: 1 }
      }
    }
  ]);

  const reactionsMap = {};
  reactionsCount.forEach(r => {
    const postId = r._id.post.toHexString();

    if (!reactionsMap[postId]) {
      reactionsMap[postId] = {};
    }

    reactionsMap[postId][r._id.reaction] = r.count;
  });

  return reactionsMap;
};

PostSchema.virtual("reactionsCount")
  .get(function() {
    return this._reactionsCount || { Like: 0, Dislike: 0 };
  })
  .set(function(value) {
    this._reactionsCount = value;
  });

PostSchema.virtual("commentsCount")
  .get(function() {
    return this._commentsCount || 0;
  })
  .set(function(value) {
    this._commentsCount = value;
  });

PostSchema.virtual("userReaction")
  .get(function() {
    return this._userReaction || null;
  })
  .set(function(value) {
    this._userReaction = value;
  });

if (process.env.NODE_ENV !== "test") {
  PostSchema.plugin(idValidator);
}

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
