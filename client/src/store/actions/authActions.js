import { AUTH_SUCCESS, AUTH_USER, AUTH_ERROR } from "./actionTypes";

export const authSuccess = () => {
  return {
    type: AUTH_SUCCESS
  };
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    error
  };
};

export const authUser = ({ email, password }) => {
  return {
    type: AUTH_USER,
    email,
    password
  };
};
