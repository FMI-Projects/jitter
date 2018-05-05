const Post = require("../data/models/post");

const createPost = async (req, res) => {
  try {
    let post = new Post(req.body);
    post.author = req.user._id;
    post = await post.save();

    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {$set: req.body},
      {new: true}
    );

    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost
};
