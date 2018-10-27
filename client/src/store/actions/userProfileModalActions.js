import * as actionTypes from "./actionTypes";

export const userProfileModalInit = () => {
  return {
    type: actionTypes.USER_PROFILE_MODAL_INIT
  };
};

export const userProfileModalContinue = () => {
  return {
    type: actionTypes.USER_PROFILE_MODAL_CONTINUE
  };
};

export const userProfileModalClose = () => {
  return {
    type: actionTypes.USER_PROFILE_MODAL_CLOSE
  };
};

export const userProfileModalUpdate = profileData => {
  return {
    type: actionTypes.USER_PROFILE_MODAL_UPDATE,
    profileData
  };
};
