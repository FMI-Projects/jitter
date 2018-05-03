const mongoose = require("mongoose");
const validator = require("validator");

const constants = require("../../utilities/constants/constants");

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true,
    maxLength: constants.profile.bio.maxLength,
    default: null
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female"],
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
      validator: validator.isURL,
      message: "{VALUE} is not a valid URL"
    }
  },
  navProfilePictureUrl: {
    type: String,
    default: null,
    validate: {
      validator: validator.isURL,
      message: "{VALUE} is not a valid URL"
    }
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
