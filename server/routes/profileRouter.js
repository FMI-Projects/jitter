const profileRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const profileController = require("../controllers/profileController");

profileRouter.get(
  "/:id/posts",
  authenticate,
  profileController.getProfilePosts
);
profileRouter.get("/:id", authenticate, profileController.getProfileInfo);
profileRouter.get("/", authenticate, profileController.searchProfiles);

module.exports = profileRouter;
