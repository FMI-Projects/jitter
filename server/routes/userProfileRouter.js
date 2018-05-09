const userProfileRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const userProfileController = require("../controllers/userProfileController");

userProfileRouter.get(
  "/",
  authenticate,
  userProfileController.getCurrentUserProfile
);
userProfileRouter.patch(
  "/",
  authenticate,
  userProfileController.updateCurrentUserProfile
);

module.exports = userProfileRouter;
