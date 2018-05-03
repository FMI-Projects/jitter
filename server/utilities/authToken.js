const jwt = require("jsonwebtoken");

const createJwt = userId => {
  const access = "auth";
  return jwt
    .sign(
      {
        _id: userId.toHexString(),
        access
      },
      process.env.JWT_SECRET
    )
    .toString();
};

const decodeJwt = token => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
};

module.exports = {
  createJwt,
  decodeJwt
};
