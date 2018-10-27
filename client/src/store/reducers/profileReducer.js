import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import comparators from "./comparators";

const initialState = new Map({
  profileId: null,
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  bio: null,
  birthday: null,
  gender: null,
  friendships: new Map({ byId: new Map(), allIds: new List() }),
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
  const profile = action.profile.getIn([
    "entities",
    "profile",
    action.profile.get("result")
  ]);
  state = state.merge({
    profilePictureUrl: profile.get("profilePictureUrl"),
    profileId: profile.get("_id"),
    firstName: profile.get("firstName"),
    lastName: profile.get("lastName"),
    bio: profile.get("bio"),
    birthday: profile.get("birthday"),
    gender: profile.get("gender"),
    loading: false
  });

  state = state.updateIn(["friendships", "byId"], friendships =>
    friendships.mergeWith(
      comparators.compareShallow,
      action.profile.getIn(["entities", "friendship"])
    )
  );

  state = state.updateIn(["friendships", "allIds"], friendships =>
    friendships.concat(action.profile.get("result"))
  );

  state = state.update("friendshipsWith", friendshipsWith =>
    friendshipsWith.mergeWith(
      comparators.compareShallow,
      action.profile.getIn(["entities", "with"])
    )
  );

  return state;
};

export default profileReducer;
