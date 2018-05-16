import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";

const initialState = {
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  bio: null,
  birthday: null,
  gender: null,
  loading: true
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
  const profilePictureUrl = formatImage.getFullUrl(action.profilePictureUrl);
  return {
    ...state,
    profileId: action._id,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl,
    bio: action.bio,
    birthday: action.birthday,
    gender: action.gender,
    loading: false
  };
};

export default profileReducer;
