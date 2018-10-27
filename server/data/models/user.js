const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");

const userConstants = require("../../utilities/constants/userConstants");
const encryption = require("../../utilities/encryption");
const authToken = require("../../utilities/authToken");
const validationMessages = require("../../utilities/validation/messages");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, validationMessages.required("Email")],
    minlength: [
      userConstants.email.minLength,
      validationMessages.minLength("Email", userConstants.email.minLength)
    ],
    maxlength: [
      userConstants.email.maxLength,
      validationMessages.maxLength("Email", userConstants.email.maxLength)
    ],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: [true, validationMessages.required("Password")],
    minlength: [
      userConstants.password.minLength,
      validationMessages.minLength("Password", userConstants.password.minLength)
    ],
    maxlength: [
      userConstants.password.maxLength,
      validationMessages.maxLength("Password", userConstants.password.maxLength)
    ]
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

if (process.env.NODE_ENV !== "test") {
  UserSchema.plugin(uniqueValidator, {
    message: validationMessages.unique("Email")
  });
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
