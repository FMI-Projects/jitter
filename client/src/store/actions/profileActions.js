import * as actionTypes from "./actionTypes";

export const profileGet = profileId => {
  return {
    type: actionTypes.PROFILE_GET,
    profileId
  };
};

export const profileGetSuccess = (
  firstName,
  lastName,
  profilePictureUrl,
  navProfilePictureUrl,
  bio,
  birthday
) => {
  return {
    type: actionTypes.PROFILE_GET_SUCCESS,
    firstName,
    lastName,
    profilePictureUrl,
    navProfilePictureUrl,
    bio,
    birthday
  };
};
