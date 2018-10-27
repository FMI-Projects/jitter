import { Map } from "immutable";

import * as actionTypes from "../actions/actionTypes";

const initialState = new Map({
  step: null,
  open: false
});

const userProfileModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_PROFILE_MODAL_INIT: {
      return applyUserProfileModalInit(state, action);
    }
    case actionTypes.USER_PROFILE_MODAL_CONTINUE: {
      return applyUserProfileModalContinue(state, action);
    }
    case actionTypes.USER_PROFILE_MODAL_CLOSE: {
      return applyUserProfileModalClose(state, action);
    }
    default:
      return state;
  }
};

const applyUserProfileModalInit = (state, action) => {
  return state.merge({
    step: "start",
    open: true
  });
};

const applyUserProfileModalContinue = (state, action) => {
  let nextStep = null;
  switch (state.get("step")) {
    case "start":
      nextStep = "personalInfo";
      break;
    case "personalInfo":
      nextStep = "profilePicture";
      break;
    case "profilePicture":
      nextStep = "finish";
      break;
    default:
      nextStep = null;
  }

  return state.merge({
    step: nextStep
  });
};

const applyUserProfileModalClose = (state, action) => {
  return initialState;
};

export default userProfileModalReducer;
