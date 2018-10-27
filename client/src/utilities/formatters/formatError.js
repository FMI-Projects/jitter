export const formatHttpError = error => {
  if (!error.response) {
    return error.message;
  }

  const serverError = error.response.data;

  if (serverError.statusCode === 422) {
    return serverError.errors.join(", ");
  }

  return serverError.message;
};
