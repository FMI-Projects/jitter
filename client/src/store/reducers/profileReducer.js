import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  bio: null,
  birthday: null,
  gender: null,
  loading: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_GET: {
      return applyProfileGet(state, action);
    }
    case actionTypes.PROFILE_GET_SUCCESS: {
      return applyProfileGetSuccess(state, action);
    }
    default:
      return state;
  }
};

const applyProfileGet = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const applyProfileGetSuccess = (state, action) => {
  return {
    ...state,
    profileId: action._id,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl: action.profilePictureUrl,
    bio: action.bio,
    birthday: action.birthday,
    gender: action.birthday,
    loading: false
  };
};

export default profileReducer;
