const commentRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const commentController = require("../controllers/commentController");

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

commentRouter.get("/:id", authenticate, commentController.getComment);

module.exports = commentRouter;
