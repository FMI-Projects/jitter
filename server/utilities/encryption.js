const bcrypt = require("bcryptjs");

const ServerError = require("../exceptions/serverError");
const ValidationError = require("../exceptions/logicErrors/validationError");

const hashPassword = async password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(new ServerError("Error generating salt"));
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject(new ServerError("Error hashing password"));
        }
        resolve(hash);
      });
    });
  });
};

const validatePassword = async (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (!res) {
        return reject(new ValidationError("Invalid login credentials"));
      }

      resolve();
    });
  });
};

module.exports = {
  hashPassword,
  validatePassword
};
