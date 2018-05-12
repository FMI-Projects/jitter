const mongoose = require("mongoose");

const FriendshipSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: ["Pending", "Accepted", "Declined"]
  }
});

FriendshipSchema.index({ from: 1, to: 1 }, { unique: true });

const Friendship = mongoose.model("Friendship", FriendshipSchema);

module.exports = Friendship;
