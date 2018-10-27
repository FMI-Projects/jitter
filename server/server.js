require("./config");
require("./data/mongoose").then(() => {
  require("./app");
});
