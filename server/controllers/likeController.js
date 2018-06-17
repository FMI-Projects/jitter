const Like = require("../data/models/like");

const deleteLike = async (req, res, next) => {
  try {
    const like = await Like.findOneAndRemove({
      post: req.params.postId,
      author: req.user._id
    });

    if (!like) {
      return res.boom.notFound("Like not found!");
    }

    res.status(200).json({ like });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deleteLike
};
