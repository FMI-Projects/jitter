import * as actionTypes from "../actions/actionTypes";

const initialState = {
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  navProfilePictureUrl: null,
  bio: null,
  birthday: null,
  gender: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_GET_SUCCESS: {
      return applyProfile(state, action);
    }
    default:
      return state;
  }
};

const applyProfile = (state, action) => {
  return {
    ...state,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl: action.profilePictureUrl,
    navProfilePictureUrl: action.navProfilePictureUrl,
    bio: action.bio,
    birthday: action.birthday,
    gender: action.birthday
  };
};

export default profileReducer;
