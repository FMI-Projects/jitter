import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authenticated: false,
  userId: null,
  token: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      return applyAuthSuccess(state, action);
    }
    case actionTypes.AUTH_LOGOUT_SUCCESS: {
      return applyAuthLogoutSuccess(state, action);
    }
    case actionTypes.AUTH_ERROR: {
      return applyAuthError(state, action);
    }
    default:
      return state;
  }
};

const applyAuthSuccess = (state, action) => {
  return {
    ...state,
    authenticated: true,
    userId: action.userId,
    token: action.token,
    error: null
  };
};

const applyAuthLogoutSuccess = state => {
  return {
    ...state,
    authenticated: false,
    userId: null,
    token: null,
    error: null
  };
};

const applyAuthError = (state, action) => {
  return { ...state, error: action.error };
};

export default authReducer;
