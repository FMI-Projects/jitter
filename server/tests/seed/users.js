const jwt = require("jsonwebtoken");

const {ObjectID} = require("mongodb");
const User = require("../../data/models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "test@gmail.com",
    password: "userOnePass"
  },
  {
    _id: userTwoId,
    email: "secondTest@gmail.com",
    password: "userTwoPass"
  }
];

const token = jwt
  .sign({_id: userOneId, access: "auth"}, process.env.JWT_SECRET)
  .toString();

const populateUsers = async () => {
  const userOne = new User(users[0]).save();
  const userTwo = new User(users[1]).save();

  await Promise.all([userOne, userTwo]);
};

module.exports = {
  populateUsers,
  users,
  token
};
