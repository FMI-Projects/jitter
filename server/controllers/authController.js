const User = require("../data/models/user");
const Profile = require("../data/models/profile");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    await user.validatePassword(password);
    const profile = await Profile.findByUserId(user._id);
    const token = await user.generateAuthToken();

    res
      .header("x-auth", token)
      .status(200)
      .send({
        user: {
          _id: user._id
        },
        profile: {
          ...profile._doc
        }
      });
  } catch (e) {
    res.status(400).send(e);
  }
};

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    let user = new User({ email, password });
    let profile = new Profile({ firstName, lastName, _userId: user._id });

    await user.validate();
    await profile.validate();

    user = await user.save();
    profile = await profile.save();
    const token = await user.generateAuthToken();
    res
      .header("x-auth", token)
      .status(201)
      .send({
        user: {
          _id: user._id
        },
        profile: {
          ...profile._doc
        }
      });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  login,
  register
};
