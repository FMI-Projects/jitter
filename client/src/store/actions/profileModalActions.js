import * as actionTypes from "./actionTypes";

export const profileModalInit = () => {
  return {
    type: actionTypes.PROFILE_MODAL_INIT
  };
};

export const profileModalContinue = () => {
  return {
    type: actionTypes.PROFILE_MODAL_CONTINUE
  };
};

export const profileModalClose = () => {
  return {
    type: actionTypes.PROFILE_MODAL_CLOSE
  };
};

export const profileModalUpdate = profileData => {
  return {
    type: actionTypes.PROFILE_MODAL_UPDATE,
    profileData
  };
};
