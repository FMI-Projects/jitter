import userConstants from "../../utilities/constants/userConstants";

export const minLength = length => value =>
  value && value.length < length
    ? `Field must be at least ${length} characters long`
    : undefined;

export const emailMinLength = minLength(userConstants.email.minLength);
export const passwordMinLength = minLength(userConstants.password.minLength);
