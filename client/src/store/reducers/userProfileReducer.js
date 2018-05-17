import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";

const initialState = {
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  friendShips: []
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
  const profilePictureUrl = formatImage.getFullUrl(action.profilePictureUrl);

  return {
    ...state,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl,
    friendShips: action.friendShips
  };
};

export default profileReducer;
