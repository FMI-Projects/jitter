process.env.NODE_ENV = "test";
require("../../config");
require("./mockgoose");
require("../../data/mongoose").then(() => {
  require("../../app");
});
