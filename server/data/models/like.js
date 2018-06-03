const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const validationMessages = require("../../utilities/validation/messages");

const LikeSchema = new mongoose.Schema(
  {
    reaction: {
      type: String,
      trim: true,
      enum: {
        values: ["Like", "Dislike", null]
      },
      default: null
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
      unique: true,
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

if (process.env.NODE_ENV !== "test") {
  LikeSchema.plugin(uniqueValidator, {
    message: validationMessages.unique("Author")
  });
}

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
