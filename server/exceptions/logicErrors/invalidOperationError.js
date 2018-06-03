const LogicError = require("../logicError");

class InvalidOperationError extends LogicError {
  constructor(message) {
    super(message);
  }
}

module.exports = InvalidOperationError;
