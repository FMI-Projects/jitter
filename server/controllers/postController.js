const Post = require("../data/models/post");
const Comment = require("../data/models/comment");

const createPost = async (req, res) => {
  try {
    let post = new Post(req.body);
    post.author = req.user._id;
    post = await post.save();

    res.status(201).send(post);
  } catch (e) {
    next(e);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (e) {
    next(e);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!post) {
      res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (e) {
    next(e);
  }
};

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.findPostComments(
      req.params.id,
      req.user._id
    );

    if (!comments) {
      res.status(404).send("Post not found");
    }

    res.status(200).send(comments);
  } catch (e) {
    next(e);
  }
};

const createComment = async (req, res) => {
  try {
    let comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.post = req.params.id;
    comment = await comment.save();

    res.status(201).send(comment);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostComments,
  createComment
};
