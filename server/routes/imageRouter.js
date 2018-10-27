const imageRouter = require("express").Router();

const authenticate = require("../middleware/authenticate");
const imageController = require("../controllers/imageController");

imageRouter.get("/", authenticate, imageController.createImageSignedUrl);

module.exports = imageRouter;
