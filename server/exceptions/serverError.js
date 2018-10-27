const CustomError = require("./customError");

class ServerError extends CustomError {
  constructor(message) {
    super(message);
  }
}

module.exports = ServerError;
