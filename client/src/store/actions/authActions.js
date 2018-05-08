import * as actionTypes from "./actionTypes";

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    token
  };
};

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authFirstLogin = () => {
  return {
    type: actionTypes.AUTH_FIRST_LOGIN
  };
};
