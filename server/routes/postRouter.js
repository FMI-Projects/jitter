const postRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const postController = require("../controllers/postController");

postRouter.get("/:id", authenticate, postController.getPost);

postRouter.post("/", authenticate, postController.createPost);

postRouter.put(
  "/:id",
  authenticate,
  authorization.isPostAuthor,
  postController.updatePost
);

postRouter.delete(
  "/:id",
  authenticate,
  authorization.isPostAuthor,
  postController.deletePost
);

postRouter.get("/:id/comments", authenticate, postController.getPostComments);

module.exports = postRouter;
