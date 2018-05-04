const mongoose = require("mongoose");
const validator = require("validator");

const profileConstants = require("../../utilities/constants/profileConstants");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: profileConstants.firstName.maxLength
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: profileConstants.lastName.maxLength
  },
  bio: {
    type: String,
    trim: true,
    maxLength: profileConstants.bio.maxLength,
    default: null
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female", null],
    default: null
  },
  birthday: {
    type: Number,
    default: null
  },
  profilePictureUrl: {
    type: String,
    default: null,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: "{VALUE} is not a valid URL"
    }
  },
  navProfilePictureUrl: {
    type: String,
    default: null,
    validate: {
      validator: (value) => !value || validator.isURL(value),
      message: "{VALUE} is not a valid URL"
    }
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  }
});

ProfileSchema.statics.findByUserId = async function(userId) {
  const Profile = this;
  const profile = await Profile.findOne({ _userId: userId });

  if (!profile) {
    return Promise.reject();
  }

  return profile;
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
