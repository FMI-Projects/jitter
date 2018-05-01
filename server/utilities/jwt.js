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
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createJwt,
  decodeJwt
};
