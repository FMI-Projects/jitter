import {
  AUTHENTICATED,
  AUTH_USER,
  NOT_AUTHENTICATED,
  AUTH_ERROR,
} from "./actionTypes";

export const authSuccess = () => {
  return {
    type: AUTHENTICATED,
  };
};

export const authFail = error => {
  return {
    type: AUTH_ERROR,
    error,
  };
};

export const authUser = ({email, password}) => {
  return {
    type: AUTH_USER,
    email,
    password,
  };
};
