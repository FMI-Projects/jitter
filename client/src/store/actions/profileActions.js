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

export const profileError = error => {
  return {
    type: actionTypes.PROFILE_ERROR,
    error
  };
};

export const profileUpdate = profileData => {
  return {
    type: actionTypes.PROFILE_UPDATE,
    profileData
  };
};
