import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  navProfilePictureUrl: null,
  error: null,
  loading: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_SET_INFO: {
      return applyProfileSetInfo(state, action);
    }
    case actionTypes.PROFILE_ERROR: {
      return applyProfileError(state, action);
    }
    case actionTypes.PROFILE_LOAD: {
      return applyProfileLoad(state, action);
    }
    case actionTypes.PROFILE_RESET_ERROR: {
      return applyProfileResetError(state, action);
    }
    default:
      return state;
  }
};

const applyProfileSetInfo = (state, action) => {
  return {
    ...state,
    profileId: action.profileId,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl: action.profilePictureUrl,
    navProfilePictureUrl: action.navProfilePictureUrl,
    error: null,
    loading: false
  };
};

const applyProfileError = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const applyProfileLoad = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const applyProfileResetError = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null
  };
};

export default profileReducer;
