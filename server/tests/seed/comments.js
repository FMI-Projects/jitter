const {ObjectId} = require("mongodb");
const Comment = require("../../data/models/comment");

const {users} = require("./users");
const {posts} = require("./posts");

const faker = require("faker");

const commentOneId = new ObjectId();
const commentTwoId = new ObjectId();

const comments = [
  {
    _id: commentOneId,
    content: faker.lorem.text(),
    author: users[0]._id,
    post: posts[0]._id
  },
  {
    _id: commentTwoId,
    content: faker.lorem.text(),
    author: users[1]._id,
    post: posts[0]._id
  }
];

const populateComments = async () => {
  const commentOne = new Comment(comments[0]).save();
  const commentTwo = new Comment(comments[1]).save();

  await Promise.all([commentOne, commentTwo]);
};

module.exports = {
  populateComments,
  comments
};
