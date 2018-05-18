const Comment = require("../data/models/comment");

const editComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!comment) {
      res.status(404).send("Comment not found");
    }

    res.status(200).send(comment);
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);

    if (!comment) {
      res.status(404).send("Comment not found");
    }

    res.status(200).send(comment);
  } catch (e) {
    next(e);
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      res.status(404).send("Comment not found");
    }

    res.status(200).send(comment);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  editComment,
  deleteComment,
  getComment
};
