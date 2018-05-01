const bcrypt = require("bcryptjs");

const hashPassword = async password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return reject(err);
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject(err);
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
        return reject(err);
      }

      resolve();
    });
  });
};

module.exports = {
  hashPassword,
  validatePassword
};
