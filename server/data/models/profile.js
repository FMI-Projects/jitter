const mongoose = require("mongoose");
const validator = require("validator");

const profileConstants = require("../../utilities/constants/profileConstants");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: profileConstants.firstName.maxLength
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: profileConstants.lastName.maxLength
  },
  bio: {
    type: String,
    trim: true,
    maxlength: profileConstants.bio.maxLength,
    default: null
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female", null],
    default: null
  },
  birthday: {
    type: Date,
    default: null
  },
  profilePictureUrl: {
    type: String,
    default: null,
    validate: {
      validator: value => !value || validator.isURL(value),
      message: "{VALUE} is not a valid URL"
    }
  },
  navProfilePictureUrl: {
    type: String,
    default: null,
    validate: {
      validator: value => !value || validator.isURL(value),
      message: "{VALUE} is not a valid URL"
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    unique: true,
    ref: "User"
  }
});

ProfileSchema.statics.findByUserId = async function(userId) {
  const Profile = this;
  const profile = await Profile.findOne({ user: userId });

  if (!profile) {
    return Promise.reject();
  }

  return profile;
};

ProfileSchema.statics.findByUserIdAndUpdate = async function(userId, data) {
  const Profile = this;

  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: data },
    { new: true }
  );

  if (!profile) {
    return Promise.reject();
  }

  return profile;
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
