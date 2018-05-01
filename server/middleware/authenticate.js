const { decodeJwt } = require("../utilities/jwt");
const User = require("../data/models/user");

const authenticate = (req, res, next) => {
  const token = req.header("x-auth");

  try {
    const { _id } = decodeJwt(token);
    const user = User.findById(_id);

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

module.exports = { authenticate };
