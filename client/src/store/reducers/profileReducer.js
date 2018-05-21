import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import _ from "lodash";

const initialState = {
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  bio: null,
  birthday: null,
  gender: null,
  friendships: [],
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
  const newState = _.cloneDeep(state);
  newState.loading = true;
  return newState;
};

const applyProfileGetSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const profilePictureUrl = formatImage.getFullUrl(action.profilePictureUrl);
  newState.profileId = action._id;
  newState.firstName = action.firstName;
  newState.lastName = action.lastName;
  newState.profilePictureUrl = profilePictureUrl;
  newState.bio = action.bio;
  newState.birthday = action.birthday;
  newState.gender = action.gender;
  newState.friendships = action.friendships;
  newState.loading = false;

  return newState;
};

export default profileReducer;
