const Post = require("../data/models/post");
const Comment = require("../data/models/comment");
const Like = require("../data/models/like");

const createPost = async (req, res, next) => {
  try {
    let post = new Post(req.body);
    post.author = req.user._id;
    post = await post.save();

    res.status(201).send(post);
  } catch (e) {
    next(e);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.boom.notFound("Post not found");
    }

    res.status(200).send(post);
  } catch (e) {
    next(e);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { title, content, imageUrl } = req.body;
    const post = await Post.editPost(
      req.params.id,
      title,
      content,
      imageUrl,
      req.user._id
    );

    if (!post) {
      return res.boom.notFound("Post not found");
    }

    res.status(200).send(post);
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.boom.notFound("Post not found");
    }

    await post.remove();

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.findPostComments(req.params.id);

    if (!comments) {
      return res.boom.notFound("Post not found");
    }

    res.status(200).send(comments);
  } catch (e) {
    next(e);
  }
};

const createComment = async (req, res, next) => {
  try {
    let comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      post: req.params.id
    });
    comment = await comment.save();

    res.status(201).send(comment);
  } catch (e) {
    next(e);
  }
};

const likePost = async (req, res, next) => {
  try {
    let like = await Like.findOne({
      post: req.params.id,
      author: req.user._id
    });

    if (like) {
      like.reaction = req.body.reaction;
    } else {
      like = new Like({
        reaction: req.body.reaction,
        author: req.user._id,
        post: req.params.id
      });
    }

    like = await like.save();

    res.status(201).send(like);
  } catch (e) {
    next(e);
  }
};

const deleteLike = async (req, res, next) => {
  try {
    const like = await Like.findOneAndRemove({
      post: req.params.id,
      author: req.user._id
    });

    if (!like) {
      return res.boom.notFound("Like not found!");
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const getPostLikes = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.boom.notFound("Post not found!");
    }

    const likes = await Like.findPostLikes(req.params.id);

    res.status(200).send(likes);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getPost,
  editPost,
  deletePost,
  getPostComments,
  createComment,
  likePost,
  deleteLike,
  getPostLikes
};
