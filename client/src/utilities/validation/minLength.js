import userConstants from "../../utilities/constants/userConstants";
import postConstants from "../../utilities/constants/postConstants";

export const minLength = length => value =>
  value && value.length < length
    ? `Field must be at least ${length} characters long`
    : undefined;

export const emailMinLength = minLength(userConstants.email.minLength);
export const passwordMinLength = minLength(userConstants.password.minLength);
export const postTitleMinLength = minLength(postConstants.title.minLength);
