const Comment = require("../data/models/comment");

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

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  editComment,
  deleteComment,
  getComment
};
