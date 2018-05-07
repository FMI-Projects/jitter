const profileRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const profileController = require("../controllers/profileController");

profileRouter.get("/me", authenticate, profileController.getCurrentUserProfile);
profileRouter.patch("/", authenticate, profileController.updateCurrentUserProfile);

module.exports = profileRouter;
