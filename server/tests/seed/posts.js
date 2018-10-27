const { ObjectId } = require("mongodb");
const Post = require("../../data/models/post");

const { profiles } = require("./profiles");

const faker = require("faker");

const postOneId = new ObjectId();
const postTwoId = new ObjectId();

const posts = [
  {
    _id: postOneId,
    title: faker.name.title(),
    content: faker.lorem.text(),
    author: profiles[0]._id
  },
  {
    _id: postTwoId,
    title: faker.name.title(),
    content: faker.lorem.text(),
    author: profiles[1]._id
  }
];

const populatePosts = async () => {
  const postOne = new Post(posts[0]).save();
  const postTwo = new Post(posts[1]).save();

  await Promise.all([postOne, postTwo]);
};

module.exports = {
  populatePosts,
  posts
};
