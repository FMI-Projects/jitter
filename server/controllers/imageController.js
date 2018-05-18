const imageUpload = require("../utilities/aws/imageUpload");

const createImageSignedUrl = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const imageUrl = await imageUpload.getSignedUrl(userId);

    res.status(200).send(imageUrl);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createImageSignedUrl
};
