const Like = require("../data/models/like");

const deleteLike = async (req, res, next) => {
  try {
    const like = await Like.findByIdAndRemove(req.params.id);

    if (!like) {
      return res.boom.notFound("Like not found!");
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deleteLike
};
