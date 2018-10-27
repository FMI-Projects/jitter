const userProfileRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const userProfileController = require("../controllers/userProfileController");

userProfileRouter.get(
  "/",
  authenticate,
  userProfileController.getCurrentUserProfile
);
userProfileRouter.get(
  "/feed",
  authenticate,
  userProfileController.getUserNewsFeed
);
userProfileRouter.patch(
  "/",
  authenticate,
  userProfileController.updateCurrentUserProfile
);
userProfileRouter.post(
  "/friendships",
  authenticate,
  userProfileController.sendFriendRequest
);
userProfileRouter.put(
  "/friendships/:id",
  authenticate,
  userProfileController.updateFriendRequest
);
userProfileRouter.delete(
  "/friendships/:id",
  authenticate,
  userProfileController.deleteFriendRequest
);

module.exports = userProfileRouter;
