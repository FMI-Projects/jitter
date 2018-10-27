const friendshipHandler = require("./friendshipHandler");

module.exports = (io, socket) => {
  const handlers = {
    ...friendshipHandler(io, socket)
  };

  for (const handler in handlers) {
    if (handlers.hasOwnProperty(handler)) {
      handlers[handler]();
    }
  }
};
