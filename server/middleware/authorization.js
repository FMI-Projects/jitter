const Post = "../data/models/post";

const isPostAuthor = async (req, res, next) => {
  try {
    const post = await Post.getById(req.params.postId);

    if (post._id !== req.user._id) {
      return res.status(401).send();
    }

    next();
  } catch (e) {
    return res.status(400).send();
  }
};

module.exports = {
  isPostAuthor
};
