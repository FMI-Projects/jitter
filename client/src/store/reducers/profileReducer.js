import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  navProfilePictureUrl: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_SET_INFO: {
      return applyProfileSetInfo(state, action);
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
    navProfilePictureUrl: action.navProfilePictureUrl
  };
};

export default profileReducer;
