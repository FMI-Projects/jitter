import * as actionTypes from "../actions/actionTypes";

const initialState = {
  step: null,
  open: false
};

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
  return {
    ...state,
    step: "start",
    open: true
  };
};

const applyUserProfileModalContinue = (state, action) => {
  let nextStep = null;
  switch (state.step) {
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

  return {
    ...state,
    step: nextStep
  };
};

const applyUserProfileModalClose = (state, action) => {
  return {
    ...initialState
  };
};

export default userProfileModalReducer;
