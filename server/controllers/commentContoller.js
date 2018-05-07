const Comment = require("../data/models/comment");

const createComment = async (req, res) => {
  try {
    let comment = new Comment(req.body);
    comment.author = req.user._id;
    comment = await comment.save();

    res.status(201).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

const editComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {$set: req.body},
      {new: true}
    );

    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);

    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.findPostComments(req.params.id);

    res.status(200).send(comments);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
  getPostComments,
  getComment
};
