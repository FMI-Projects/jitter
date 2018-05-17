const mongoose = require("mongoose");

const profileConstants = require("../../utilities/constants/profileConstants");

const ProfileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
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
    default: null
  },
  friendships: {
    type: [
      {
        status: {
          type: String,
          enum: ["Accepted", "Declined", "Pending", "Requested"],
          trim: true,
          required: true
        },
        with: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true,
          ref: "Profile"
        },
        seen: {
          type: Boolean,
          default: false
        }
      }
    ],
    default: []
  }
});

ProfileSchema.statics.getUserProfileInfo = async function(profileId) {
  const Profile = this;

  return Profile.findById(profileId).populate(
    "friendships.with",
    "_id firstName lastName profilePictureUrl"
  );
};

ProfileSchema.statics.getProfileInfo = async function(profileId) {
  const Profile = this;

  const profile = await Profile.findById(profileId).populate(
    "friendships.with",
    "_id firstName lastName profilePictureUrl"
  );

  profile.friendships = profile.friendships.filter(
    f => f.status === "Accepted"
  );

  return profile;
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
