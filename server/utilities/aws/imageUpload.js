const s3 = require("./s3");
const uuid = require("uuid/v1");

const getSignedUrl = userId => {
  const key = `${userId}/${uuid()}.png`;

  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "jitter-fmi",
        ContentType: "png",
        Key: key
      },
      (err, url) => {
        if (err) {
          reject(err);
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
