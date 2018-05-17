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
          index: true,
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

ProfileSchema.statics.sendFriendRequest = async function(from, to) {
  const Profile = this;

  const setFrom = Profile.update(
    { _id: from, "friendships.with": { $ne: to } },
    { $push: { friendships: { status: "Requested", seen: true, with: to } } }
  );

  const setTo = Profile.update(
    { _id: to, "friendships.with": { $ne: from } },
    { $push: { friendships: { status: "Pending", seen: false, with: from } } }
  );

  const sendIfPreviouslyDeclined = Profile.update(
    { _id: to, "friendships.with": from, "friendships.status": "Declined" },
    { $set: { "friendships.seen": false, "friendships.status": "Pending" } }
  );

  await Promise.all([setFrom, setTo, sendIfPreviouslyDeclined]);
};

ProfileSchema.statics.updateFriendRequest = async function(from, to, status) {
  const Profile = this;

  let setFrom = null;
  let setTo = null;

  switch (status) {
    case "Accept":
      setFrom = Profile.update(
        { _id: from, "friendships.with": to, "friendships.status": "Pending" },
        { $set: { "friendships.seen": true, "friendships.status": "Accepted" } }
      );

      setTo = Profile.update(
        {
          _id: to,
          "friendships.with": from,
          "friendships.status": "Requested"
        },
        { $set: { "friendships.seen": true, "friendships.status": "Accepted" } }
      );

      break;

    case "Decline":
      setFrom = Profile.update(
        { _id: from },
        { $pull: { "friendships.with": to } }
      );

      setTo = Profile.update(
        { _id: to, "friendships.with": from },
        { $set: { "friendships.seen": true, "friendships.status": "Declined" } }
      );

      break;
  }

  await Promise.all([setFrom, setTo]);
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
