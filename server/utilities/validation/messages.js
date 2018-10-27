const required = field => `${field} is required`;
const minLength = (field, length) =>
  `${field} must be at least ${length} symbols long`;
const maxLength = (field, length) =>
  `${field} can't be more than ${length} symbols long`;
const unique = field => `${field} already exists`;
const invalidValue = field => `{VALUE} is not a valid value for ${field}`;

module.exports = {
  required,
  minLength,
  maxLength,
  unique,
  invalidValue
};
