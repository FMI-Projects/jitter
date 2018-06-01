const ServerError = require("./serverError");

class SocketError extends ServerError {
  constructor(message) {
    super(message);
  }
}

module.exports = SocketError;
