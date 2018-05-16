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
  }
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
