const LogicError = require("../logicError");

class DataNotFoundError extends LogicError {
  constructor(message) {
    super(message);
  }
}

module.exports = DataNotFoundError;
