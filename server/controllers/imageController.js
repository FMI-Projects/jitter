const imageUpload = require("../utilities/aws/imageUpload");

const createImageSignedUrl = async (req, res) => {
  const userId = req.user._id;

  try {
    const imageUrl = await imageUpload.getSignedUrl(userId);
    res.status(200).send(imageUrl);
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  createImageSignedUrl
};
