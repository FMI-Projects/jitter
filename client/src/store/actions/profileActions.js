import * as actionTypes from "./actionTypes";

export const profileGetInfo = () => {
  return {
    type: actionTypes.PROFILE_GET_INFO
  };
};

export const profileSetInfo = (
  profileId,
  firstName,
  lastName,
  profilePictureUrl,
  navProfilePictureUrl
) => {
  return {
    type: actionTypes.PROFILE_SET_INFO,
    profileId,
    firstName,
    lastName,
    profilePictureUrl,
    navProfilePictureUrl
  };
};

export const profileSetUp = () => {
  return {
    type: actionTypes.PROFILE_SET_UP
  };
};

export const profileError = error => {
  return {
    type: actionTypes.PROFILE_ERROR,
    error
  };
};
