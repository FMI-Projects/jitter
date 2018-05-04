import * as actionTypes from "./actionTypes";

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    token
  };
};

export const authError = error => {
  return {
    type: actionTypes.AUTH_ERROR,
    error
  };
};

export const authUser = (email, password) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password
  };
};

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};

export const authLogoutInit = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_INIT
  };
};

export const authLogoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS
  };
};

export const authRegisterInit = (email, password, firstName, lastName) => {
  return {
    type: actionTypes.AUTH_REGISTER_INIT,
    email,
    password,
    firstName,
    lastName
  };
};

export const authResetError = () => {
  return {
    type: actionTypes.AUTH_RESET_ERROR
  };
};
