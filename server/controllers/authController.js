const User = require("../data/models/user");

const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findByEmail(email);
    await user.validatePassword(password);
    const token = await user.generateAuthToken();

    res
      .header("x-auth", token)
      .status(200)
      .send({
        _id: user._id
      });
  } catch (e) {
    res.status(400).send(e);
  }
};

const register = async (req, res) => {
  const {email, password} = req.body;
  let user = new User({email, password});

  try {
    user = await user.save();
    const token = await user.generateAuthToken();
    res
      .header("x-auth", token)
      .status(201)
      .send({
        _id: user._id
      });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  login,
  register,
};
