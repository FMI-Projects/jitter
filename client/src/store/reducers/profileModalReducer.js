import * as actionTypes from "../actions/actionTypes";

const initialState = {
  step: null,
  open: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_MODAL_INIT: {
      return applyProfileModalInit(state, action);
    }
    case actionTypes.PROFILE_MODAL_CONTINUE: {
      return applyProfileModalContinue(state, action);
    }
    case actionTypes.PROFILE_MODAL_CLOSE: {
      return applyProfileModalClose(state, action);
    }
    default:
      return state;
  }
};

const applyProfileModalInit = (state, action) => {
  return {
    ...state,
    step: "start",
    open: true
  };
};

const applyProfileModalContinue = (state, action) => {
  let nextStep = null;
  switch (state.step) {
    case "start":
      nextStep = "personalInfo";
      break;
    case "profileInfo":
      nextStep = "profilePicture";
      break;
    case "profilePicture":
      nextStep = "finish";
      break;
    default:
      nextStep = null;
  }

  return {
    ...state,
    step: nextStep
  };
};

const applyProfileModalClose = (state, action) => {
  return {
    ...initialState
  };
};

export default profileReducer;
