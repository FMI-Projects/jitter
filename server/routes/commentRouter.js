const commentRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const commentController = require("../controllers/commentContoller");

commentRouter.post("/:id", authenticate, commentController.createComment);

commentRouter.put(
  "/:id",
  authenticate,
  authorization.isCommentAuthor,
  commentController.editComment
);

commentRouter.delete(
  "/:id",
  authenticate,
  authorization.isCommentAuthor,
  commentController.deleteComment
);

commentRouter.get("/", authenticate, commentController.getPostComments);

commentRouter.get("/:id", authenticate, commentController.getComment);

module.exports = commentRouter;
