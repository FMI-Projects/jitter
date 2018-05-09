import * as actionTypes from "../actions/actionTypes";

const initialState = {
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  navProfilePictureUrl: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_PROFILE_SET_INFO: {
      return applyUserProfileSetInfo(state, action);
    }
    default:
      return state;
  }
};

const applyUserProfileSetInfo = (state, action) => {
  return {
    ...state,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl: action.profilePictureUrl,
    navProfilePictureUrl: action.navProfilePictureUrl
  };
};

export default profileReducer;
