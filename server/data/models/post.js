const mongoose = require("mongoose-fill");
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

PostSchema.statics.createPost = async function(postData, author) {
  let post = new Post(postData);
  post.author = author;
  post = await post.save();

  post.__reactionsCount = { Like: 0, Dislike: 0 };
  post.__commentsCount = 0;
  post.__userReaction = null;

  return post;
};

PostSchema.statics.findProfilesPosts = async function(
  profileIds,
  currentUserId
) {
  const Post = this;

  const posts = await Post.find({ author: { $in: profileIds } })
    .sort({
      _id: "descending"
    })
    .populate("author", "_id firstName lastName profilePictureUrl")
    .fill("reactionsCount")
    .fill("commentsCount")
    .fill("userReaction", currentUserId)
    .exec();

  setDefaultVirtualsIfUndefined(posts);

  return posts;
};

PostSchema.statics.findProfilePosts = async function(profileId, currentUserId) {
  const Post = this;

  const posts = await Post.find({ author: profileId })
    .sort({
      _id: "descending"
    })
    .fill("reactionsCount")
    .fill("commentsCount")
    .fill("userReaction", currentUserId)
    .exec();

  setDefaultVirtualsIfUndefined(posts);

  return posts;
};

const setDefaultVirtualsIfUndefined = posts => {
  posts.forEach(p => {
    p.__reactionsCount = p.__reactionsCount || { Like: 0, Dislike: 0 };
    p.__commentsCount = p.__commentsCount || 0;
    p.__userReaction = p.__userReaction || null;
  });
};

PostSchema.fill("reactionsCount")
  .value()
  .multi(function(docs, ids, callback) {
    this.db.model("Like").aggregate(
      [
        {
          $match: {
            post: {
              $in: ids
            }
          }
        },
        {
          $group: {
            _id: "$post",
            likesCount: {
              $sum: {
                $cond: [{ $eq: ["$reaction", "Like"] }, 1, 0]
              }
            },
            dislikesCount: {
              $sum: {
                $cond: [{ $eq: ["$reaction", "Dislike"] }, 1, 0]
              }
            }
          }
        },
        {
          $project: {
            reactionsCount: {
              Like: "$likesCount",
              Dislike: "$dislikesCount"
            }
          }
        }
      ],
      callback
    );
  });

PostSchema.fill("commentsCount")
  .value()
  .multi(function(docs, ids, callback) {
    this.db.model("Comment").aggregate(
      [
        {
          $match: {
            post: {
              $in: ids
            }
          }
        },
        {
          $group: {
            _id: "$post",
            commentsCount: { $sum: 1 }
          }
        }
      ],
      callback
    );
  });

PostSchema.fill("userReaction")
  .value()
  .multi(function(docs, ids, currentUserId, callback) {
    this.db.model("Like").aggregate(
      [
        {
          $match: {
            $and: [
              {
                post: {
                  $in: ids
                }
              },
              {
                author: {
                  $eq: currentUserId
                }
              }
            ]
          }
        },
        {
          $group: {
            _id: "$post",
            userReaction: { $first: "$reaction" }
          }
        }
      ],
      callback
    );
  });

if (process.env.NODE_ENV !== "test") {
  PostSchema.plugin(idValidator);
}

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
