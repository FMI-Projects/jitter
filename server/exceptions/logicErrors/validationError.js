const LogicError = require("../logicError");

class ValidationError extends LogicError {
  constructor(message) {
    super(message);
  }
}

module.exports = ValidationError;
