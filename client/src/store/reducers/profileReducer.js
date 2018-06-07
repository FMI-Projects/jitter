import { Map } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import normalizers from "./normalizers";

const initialState = new Map({
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  bio: null,
  birthday: null,
  gender: null,
  friendships: new Map(),
  friendshipsWith: new Map(),
  loading: true
});

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
  return state.set("loading", true);
};

const applyProfileGetSuccess = (state, action) => {
  state = state.merge({
    profilePictureUrl: formatImage.getFullUrl(action.profilePictureUrl),
    profileId: action._id,
    firstName: action.firstName,
    lastName: action.lastName,
    bio: action.bio,
    birthday: action.birthday,
    gender: action.gender,
    loading: false
  });

  const normalizedFriendships = action.friendships.map(f =>
    normalizers.friendshipNormalizer(f)
  );

  state = state.set(
    "friendships",
    new Map(
      normalizedFriendships.map(f => ({
        [f.normalizedFriendship._id]: {
          ...f.normalizedFriendship
        }
      }))
    )
  );

  state = state.set(
    "friendshipsWith",
    new Map(
      normalizedFriendships.map(f => ({
        [f.with._id]: {
          ...f.with
        }
      }))
    )
  );

  return state;
};

export default profileReducer;
