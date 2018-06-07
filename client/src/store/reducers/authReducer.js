import { Map } from "immutable";

import * as actionTypes from "../actions/actionTypes";

const initialState = new Map({
  authenticated: false,
  userId: null,
  token: null,
  firstLogin: false
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: {
      return applyAuthSuccess(state, action);
    }
    case actionTypes.AUTH_FIRST_LOGIN: {
      return applyAuthFirstLogin(state, action);
    }
    default:
      return state;
  }
};

const applyAuthFirstLogin = (state, action) => {
  return state.merge(
    new Map({
      firstLogin: true
    })
  );
};

const applyAuthSuccess = (state, action) => {
  return state.merge(
    new Map({
      authenticated: true,
      userId: action.userId,
      token: action.token
    })
  );
};

export default authReducer;
