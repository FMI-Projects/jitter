const handleError = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.boom.badData("Invalid data", {
      errors: [
        `Invalid value for ${error.path}, please provide a ${error.kind}`
      ]
    });
  } else if (error.name === "MongoError") {
    return res.boom.badData("Invalid data", {
      errors: [error.message]
    });
  } else if (error.name === "ValidationError") {
    const errors = [];

    for (const e in error.errors) {
      if (error.errors.hasOwnProperty(e)) {
        errors.push(error.errors[e].message);
      }
    }

    return res.boom.badData("Invalid data", { errors });
  }

  res.boom.badRequest(error.message);
};

module.exports = handleError;
