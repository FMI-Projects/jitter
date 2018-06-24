import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";

const initialState = new Map({
  profiles: new Map(),
  profilesList: new List(),
  loaded: false
});

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_GET_SUCCESS: {
      return applySearchGetSuccess(state, action);
    }
    case actionTypes.SEARCH_CLEAR: {
      return applySearchClear(state, action);
    }
    default:
      return state;
  }
};

const applySearchGetSuccess = (state, action) => {
  state = state.set("profilesList", action.profiles.get("result"));
  state = state.set("profiles", action.profiles.getIn(["entities", "profile"]));
  state = state.set("loaded", true);

  return state;
};

const applySearchClear = (state, action) => {
  state = initialState;

  return state;
};

export default searchReducer;
