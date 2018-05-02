import {
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  AUTH_ERROR,
} from "../actions/actionTypes";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATED: {
      return applyAuthentication(state, true);
    }
    case NOT_AUTHENTICATED: {
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
  return {...state, authenticated: authenticated};
};

const applyAuthError = (state, error) => {
  return {...state, error};
};

export default authReducer;
