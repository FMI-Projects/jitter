const mongoose = require("mongoose");
const validator = require("validator");

const userConstants = require("../../utilities/constants/userConstants");
const encryption = require("../../utilities/encryption");
const authToken = require("../../utilities/authToken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: userConstants.email.minLength,
    maxLength: userConstants.email.maxLength,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minLength: userConstants.password.minLength,
    maxLength: userConstants.password.maxLength
  }
});

UserSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    const hash = await encryption.hashPassword(user.password);
    user.password = hash;
  }

  next();
});

UserSchema.statics.findByEmail = async function(email) {
  const User = this;
  const user = await User.findOne({ email });

  if (!user) {
    return Promise.reject();
  }

  return user;
};

UserSchema.methods.validatePassword = async function(password) {
  const user = this;
  const hashedPassword = user.password;

  return await encryption.validatePassword(password, hashedPassword);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const userId = user._id;

  return authToken.createJwt(userId);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
