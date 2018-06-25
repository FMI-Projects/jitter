import userConstants from "../../utilities/constants/userConstants";
import profileConstants from "../../utilities/constants/profileConstants";
import postConstants from "../../utilities/constants/postConstants";
import commentConstans from "../../utilities/constants/commentConstants";

export const maxLength = length => value =>
  value && value.length > length
    ? `Field can't be more than ${length} characters long`
    : undefined;

export const emailMaxLength = maxLength(userConstants.email.maxLength);
export const passwordMaxLength = maxLength(userConstants.password.maxLength);
export const firstNameMaxLength = maxLength(
  profileConstants.firstName.maxLength
);
export const lastNameMaxLength = maxLength(profileConstants.lastName.maxLength);
export const bioMaxLength = maxLength(profileConstants.bio.maxLength);
export const postTitleMaxLength = maxLength(postConstants.title.maxLength);
export const postContentMaxLength = maxLength(postConstants.content.maxLength);
export const commentContentMaxLength = maxLength(
  commentConstans.content.maxLength
);
