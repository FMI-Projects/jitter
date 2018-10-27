const postRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const postController = require("../controllers/postController");

postRouter.get("/:id", authenticate, postController.getPost);

postRouter.post("/", authenticate, postController.createPost);

postRouter.post("/:id/comments", authenticate, postController.createComment);

postRouter.put(
  "/:id",
  authenticate,
  authorization.isPostAuthor,
  postController.editPost
);

postRouter.delete(
  "/:id",
  authenticate,
  authorization.isPostAuthor,
  postController.deletePost
);

postRouter.get("/:id/comments", authenticate, postController.getPostComments);

postRouter.put("/:id/like", authenticate, postController.likePost);

postRouter.delete("/:id/like", authenticate, postController.deleteLike);

postRouter.get("/:id/likes", authenticate, postController.getPostLikes);

module.exports = postRouter;
