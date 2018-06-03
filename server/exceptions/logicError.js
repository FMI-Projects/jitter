const CustomError = require("./customError");

class LogicError extends CustomError {
  constructor(message) {
    super(message);
  }
}

module.exports = LogicError;
