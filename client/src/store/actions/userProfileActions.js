import * as actionTypes from "./actionTypes";

export const userProfileGetInfo = () => {
  return {
    type: actionTypes.USER_PROFILE_GET_INFO
  };
};

export const userProfileSetInfo = (
  firstName,
  lastName,
  profilePictureUrl,
  friendShips
) => {
  return {
    type: actionTypes.USER_PROFILE_SET_INFO,
    firstName,
    lastName,
    profilePictureUrl,
    friendShips
  };
};

export const userProfileUpdate = profileData => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE,
    profileData
  };
};
