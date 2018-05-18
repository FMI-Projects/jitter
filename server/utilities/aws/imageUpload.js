const s3 = require("./s3");
const uuid = require("uuid/v1");

const getSignedUrl = userId => {
  const key = `${userId}/${uuid()}.jpeg`;

  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "jitter-fmi",
        ContentType: "image/jpeg",
        Key: key
      },
      (err, url) => {
        if (err) {
          reject("Error getting url for image");
        } else {
          resolve({ key, url });
        }
      }
    );
  });
};

module.exports = {
  getSignedUrl
};
