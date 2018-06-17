const likeRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const likeController = require("../controllers/likeController");

likeRouter.delete(
  "/:postId",
  authenticate,
  authorization.isLikeAuthor,
  likeController.deleteLike
);

module.exports = likeRouter;
