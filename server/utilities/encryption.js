const bcrypt = require("bcryptjs");

const hashPassword = async password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject({ message: "Error generating salt" });
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject({ message: "Error hashing password" });
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
        return reject({ message: "Invalid login credentials" });
      }

      resolve();
    });
  });
};

module.exports = {
  hashPassword,
  validatePassword
};
