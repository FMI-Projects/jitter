const authToken = require("../utilities/authToken");
const User = require("../data/models/user");

const authenticate = async (req, res, next) => {
  const token = req.header("x-auth");

  if (!token) {
    return res.boom.unauthorized("Unauthorized");
  }

  try {
    const { _id } = authToken.decodeJwt(token);
    const user = await User.findById(_id);

    if (!user) {
      return res.boom.unauthorized("Unauthorized");
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authenticate;
