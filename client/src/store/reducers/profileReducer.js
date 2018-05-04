import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  navProfilePictureUrl: null,
  isProfileLoaded: false,
  firstTimeLoggedIn: false,
  error: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_SET_INFO: {
      return applyProfileSetInfo(state, action);
    }
    case actionTypes.PROFILE_ERROR: {
      return applyProfileError(state, action);
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
    isProfileLoaded: true
  };
};

const applyProfileError = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

export default profileReducer;