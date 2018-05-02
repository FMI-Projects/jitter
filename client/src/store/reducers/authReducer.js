import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "../actions/actionTypes";

const initialState = {
  authenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return applyAuthentication(state, true);
    }
    case AUTH_LOGOUT: {
      return applyAuthentication(state, false);
    }
    case AUTH_ERROR: {
      return applyAuthError(state, action.error);
    }
    default:
      return state;
  }
};

const applyAuthentication = (state, authenticated) => {
  return { ...state, authenticated };
};

const applyAuthError = (state, error) => {
  return { ...state, error };
};

export default authReducer;
