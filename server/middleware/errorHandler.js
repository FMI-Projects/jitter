const handleError = (error, req, res, next) => {
  const errors = [];

  if (error.name === "CastError") {
    errors.push(
      `Invalid value for ${error.path}, please provide a ${error.kind}`
    );
  } else if (error.name === "MongoError") {
    errors.push(error.message);
  } else if (error.name === "ValidationError") {
    for (const e in error.errors) {
      if (error.errors.hasOwnProperty(e)) {
        errors.push(error.errors[e].message);
      }
    }
  } else {
    errors.push(error);
  }

  res.status(400).send(errors);
};

module.exports = handleError;
