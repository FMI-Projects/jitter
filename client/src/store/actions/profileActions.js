import * as actionTypes from "./actionTypes";

export const profileGet = profileId => {
  return {
    type: actionTypes.PROFILE_GET,
    profileId
  };
};

export const profileGetSuccess = (profile) => {
  return {
    type: actionTypes.PROFILE_GET_SUCCESS,
    profile
  };
};
