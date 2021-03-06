const User = require("../data/models/user");
const Profile = require("../data/models/profile");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.boom.badRequest("Invalid login credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return res.boom.badRequest("Invalid login credentials");
    }

    const token = await user.generateAuthToken();

    res
      .header("x-auth", token)
      .status(200)
      .send({
        _id: user._id
      });
  } catch (e) {
    next(e);
  }
};

const register = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    let user = new User({ email, password });
    let profile = new Profile({ _id: user._id, firstName, lastName });

    await user.validate();
    await profile.validate();

    user = await user.save();
    profile = await profile.save();
    const token = await user.generateAuthToken();
    res
      .header("x-auth", token)
      .status(201)
      .send({
        _id: user._id
      });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
  register
};
