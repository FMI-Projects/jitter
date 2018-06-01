const friendshipEmitter = require("./friendshipEmitter");

module.exports = io => {
  return {
    ...friendshipEmitter(io)
  };
};
