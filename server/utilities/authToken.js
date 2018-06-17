const jwt = require("jsonwebtoken");

const createJwt = userId => {
  const access = "auth";
  return jwt
    .sign(
      {
        _id: userId.toHexString(),
        access
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )
    .toString();
};

const decodeJwt = token => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
    ignoreExpiration: true
  });
  return decodedToken;
};

module.exports = {
  createJwt,
  decodeJwt
};
