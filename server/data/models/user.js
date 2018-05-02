const mongoose = require("mongoose");
const validator = require("validator");
const constants = require("../../utilities/constants/constants");
const {
  hashPassword,
  validatePassword
} = require("../../utilities/encryption");

const { createJwt } = require("../../utilities/jwt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: constants.user.email.minLength,
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
    minLength: constants.user.password.minLength
  }
});

UserSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    const hash = await hashPassword(user.password);
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

  return await validatePassword(password, hashedPassword);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const userId = user._id;

  return createJwt(userId);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
