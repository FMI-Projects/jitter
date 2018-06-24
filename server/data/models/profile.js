const mongoose = require("mongoose");

const profileConstants = require("../../utilities/constants/profileConstants");
const validationMessages = require("../../utilities/validation/messages");
const InvalidOperationError = require("../../exceptions/logicErrors/invalidOperationError");

const ProfileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, validationMessages.required("Id")],
    ref: "User"
  },
  firstName: {
    type: String,
    required: [true, validationMessages.required("First name")],
    trim: true,
    maxlength: [
      profileConstants.firstName.maxLength,
      validationMessages.maxLength("First name")
    ]
  },
  lastName: {
    type: String,
    required: [true, validationMessages.required("Last name")],
    trim: true,
    maxlength: [
      profileConstants.lastName.maxLength,
      validationMessages.maxLength("Last name")
    ]
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [
      profileConstants.bio.maxLength,
      validationMessages.maxLength("Bio")
    ],
    default: null
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ["Male", "Female", null],
      message: validationMessages.invalidValue("Gender")
    },
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
        _id: false,
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

ProfileSchema.statics.searchProfiles = async function(searchQuery) {
  const Profile = this;

  const searchResult = await Profile.aggregate([
    {
      $addFields: {
        name: {
          $concat: ["$firstName", " ", "$lastName"]
        }
      }
    },
    {
      $match: {
        name: new RegExp(`.*${searchQuery}.*`, "i")
      }
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        _id: 1,
        profilePictureUrl: 1
      }
    }
  ]);

  return searchResult;
};

ProfileSchema.statics.getUserProfileInfo = async function(profileId) {
  const Profile = this;

  const profile = await Profile.findById(profileId).populate(
    "friendships.with",
    "_id firstName lastName profilePictureUrl"
  );

  return profile;
};

ProfileSchema.statics.getProfileInfo = async function(profileId) {
  const Profile = this;

  const profile = await Profile.findById(profileId).populate(
    "friendships.with",
    "_id firstName lastName profilePictureUrl"
  );

  if (profile) {
    profile.friendships = profile.friendships.filter(
      f => f.status === "Accepted"
    );
  }

  return profile;
};

ProfileSchema.statics.getFriendIds = async function(profileId) {
  const Profile = this;

  const profileInfo = await Profile.findById(profileId).select(
    "friendships.with"
  );

  const ids = profileInfo.friendships.map(f => f.with.toHexString());

  return ids;
};

ProfileSchema.statics.getAcceptedFriendIds = async function(profileId) {
  const Profile = this;

  const profileInfo = await Profile.findById(profileId).select(
    "friendships.with friendships.status"
  );

  const ids = profileInfo.friendships
    .filter(f => f.status === "Accepted")
    .map(f => f.with.toHexString());

  return ids;
};

ProfileSchema.statics.getByIds = async function(ids) {
  const Profile = this;

  const getByIdQueries = [];

  for (const id of ids) {
    getByIdQueries.push(Profile.findById(id));
  }

  return Promise.all(getByIdQueries);
};

ProfileSchema.statics.markFriendRequestsAsSeen = async function(profileId) {
  const Profile = this;

  await Profile.findByIdAndUpdate(profileId, {
    $set: {
      "friendships.$[].seen": true
    }
  });
};

ProfileSchema.methods.findFriendRequest = function(withProfile) {
  const profile = this;

  return profile.friendships.find(f => {
    if (!f.with) {
      return false;
    }

    const friendshipId = f.with._id || f.with;

    return friendshipId.toHexString() === withProfile._id.toHexString();
  });
};

ProfileSchema.methods.populateFriendRequest = async function(withProfile) {
  const profile = this;

  await profile
    .populate({
      path: "friendships.with",
      match: { _id: withProfile._id },
      select: "_id firstName lastName profilePictureUrl"
    })
    .execPopulate();
};

ProfileSchema.methods.sendFriendRequest = async function(toProfile) {
  const profile = this;

  let fromProfileFriendRequest = profile.findFriendRequest(toProfile);
  let toProfileFriendRequest = toProfile.findFriendRequest(profile);

  if (
    fromProfileFriendRequest ||
    (toProfileFriendRequest && toProfileFriendRequest.status !== "Declined")
  ) {
    return Promise.reject(
      new InvalidOperationError("Friend request has already been sent")
    );
  }

  profile.friendships.unshift({
    status: "Requested",
    seen: true,
    with: toProfile._id
  });

  if (toProfileFriendRequest) {
    toProfileFriendRequest.status = "Pending";
    toProfileFriendRequest.seen = false;
    toProfileFriendRequest.with = profile._id;
  } else {
    toProfile.friendships.unshift({
      status: "Pending",
      seen: false,
      with: profile._id
    });
  }

  const sendRequestFrom = profile.save();
  const sendRequestTo = toProfile.save();
  await Promise.all([sendRequestFrom, sendRequestTo]);

  const populateFriendRequestFrom = profile.populateFriendRequest(toProfile);
  const populateFriendRequestTo = toProfile.populateFriendRequest(profile);
  await Promise.all([populateFriendRequestFrom, populateFriendRequestTo]);

  fromProfileFriendRequest = profile.findFriendRequest(toProfile);
  toProfileFriendRequest = toProfile.findFriendRequest(profile);

  return [fromProfileFriendRequest, toProfileFriendRequest];
};

ProfileSchema.methods.acceptFriendRequest = async function(toProfile, action) {
  const profile = this;

  let fromProfileFriendRequest = profile.findFriendRequest(toProfile);
  let toProfileFriendRequest = toProfile.findFriendRequest(profile);

  if (
    !fromProfileFriendRequest ||
    fromProfileFriendRequest.status !== "Pending" ||
    !toProfileFriendRequest ||
    toProfileFriendRequest.status !== "Requested"
  ) {
    return Promise.reject(
      new InvalidOperationError("Friend request has not been sent")
    );
  }

  fromProfileFriendRequest.status = "Accepted";
  fromProfileFriendRequest.seen = true;

  toProfileFriendRequest.status = "Accepted";
  toProfileFriendRequest.seen = true;

  const updateRequestFrom = profile.save();
  const updateRequestTo = toProfile.save();
  await Promise.all([updateRequestFrom, updateRequestTo]);

  const populateFriendRequestFrom = profile.populateFriendRequest(toProfile);
  const populateFriendRequestTo = toProfile.populateFriendRequest(profile);
  await Promise.all([populateFriendRequestFrom, populateFriendRequestTo]);

  fromProfileFriendRequest = profile.findFriendRequest(toProfile);
  toProfileFriendRequest = toProfile.findFriendRequest(profile);

  return [fromProfileFriendRequest, toProfileFriendRequest];
};

ProfileSchema.methods.declineFriendRequest = async function(toProfile, action) {
  const profile = this;

  const fromProfileFriendRequest = profile.findFriendRequest(toProfile);
  const toProfileFriendRequest = toProfile.findFriendRequest(profile);

  if (
    !fromProfileFriendRequest ||
    fromProfileFriendRequest.status !== "Pending" ||
    !toProfileFriendRequest ||
    toProfileFriendRequest.status !== "Requested"
  ) {
    return Promise.reject(
      new InvalidOperationError("Friend request has not been sent")
    );
  }

  const fromRequestIndex = profile.friendships.indexOf(
    fromProfileFriendRequest
  );
  profile.friendships.splice(fromRequestIndex, 1);

  toProfileFriendRequest.status = "Declined";
  toProfileFriendRequest.seen = true;

  const updateRequestFrom = profile.save();
  const updateRequestTo = toProfile.save();
  await Promise.all([updateRequestFrom, updateRequestTo]);

  await toProfile.populateFriendRequest(profile);
  return toProfile.findFriendRequest(profile);
};

ProfileSchema.methods.deleteFriendRequest = async function(toProfile, action) {
  const profile = this;

  const fromProfileFriendRequest = profile.findFriendRequest(toProfile);
  const toProfileFriendRequest = toProfile.findFriendRequest(profile);

  if (!fromProfileFriendRequest || !toProfileFriendRequest) {
    return Promise.reject(
      new InvalidOperationError("Friend request has not been sent")
    );
  }

  const fromRequestIndex = profile.friendships.indexOf(
    fromProfileFriendRequest
  );
  profile.friendships.splice(fromRequestIndex, 1);

  const toRequestIndex = toProfile.friendships.indexOf(toProfileFriendRequest);
  toProfile.friendships.splice(toRequestIndex, 1);

  const deleteRequestFrom = profile.save();
  const deleteRequestTo = toProfile.save();

  await Promise.all([deleteRequestFrom, deleteRequestTo]);
};

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
