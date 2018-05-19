const profileRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const profileController = require("../controllers/profileController");

profileRouter.get(
  "/:id/posts",
  authenticate,
  profileController.getProfilePosts
);
profileRouter.get("/:id", authenticate, profileController.getProfileInfo);

module.exports = profileRouter;
