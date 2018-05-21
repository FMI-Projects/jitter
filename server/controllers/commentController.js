const Comment = require("../data/models/comment");

const editComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { content } },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return res.boom.notFound("Comment not found");
    }

    res.status(200).send(comment);
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);

    if (!comment) {
      return res.boom.notFound("Comment not found");
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.boom.notFound("Comment not found");
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
