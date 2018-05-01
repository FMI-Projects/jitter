const User = require("../data/models/user");
const _ = require("lodash");

const login = async (req, res) => {
  const { email, password } = _.pick(req.body, ["email", "password"]);

  try {
    const user = await User.findByEmail(email);
    await user.validatePassword(password);
    const token = await user.generateAuthToken();
    res
      .header("x-auth", token)
      .status(200)
      .send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const register = async (req, res) => {
  const { email, password } = _.pick(req.body, ["email", "password"]);
  let user = new User({ email, password });

  try {
    user = await user.save();
    const token = await user.generateAuthToken();
    res
      .header("x-auth", token)
      .status(201)
      .send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  login,
  register
};
