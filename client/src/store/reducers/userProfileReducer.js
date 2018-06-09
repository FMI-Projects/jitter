import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import comparators from "./comparators";

const initialState = new Map({
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  friendships: new Map({ byId: new Map(), allIds: new List() }),
  friendshipsWith: new Map()
});

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_PROFILE_SET_INFO: {
      return applyUserProfileSetInfo(state, action);
    }
    case actionTypes.USER_PROFILE_ADD_FRIENDSHIP: {
      return applyUserProfileAddFriendship(state, action);
    }
    case actionTypes.USER_PROFILE_UPDATE_FRIENDSHIP: {
      return applyUserProfileUpdateFriendship(state, action);
    }
    case actionTypes.USER_PROFILE_DELETE_FRIENDSHIP: {
      return applyUserProfileDeleteFriendship(state, action);
    }
    case actionTypes.USER_PROFILE_MARK_FRIENDSHIPS_SEEN: {
      return applyUserProfileMarkFriendshipsSeen(state, action);
    }
    default:
      return state;
  }
};

const applyUserProfileSetInfo = (state, action) => {
  state = state.merge({
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl: formatImage.getFullUrl(action.profilePictureUrl)
  });

  state = state.updateIn(["friendships", "byId"], friendships =>
    friendships.mergeWith(
      comparators.compareShallow,
      action.friendships.getIn(["entities", "friendship"])
    )
  );

  state = state.updateIn(["friendships", "allIds"], friendships =>
    friendships.concat(action.friendships.get("result"))
  );

  state = state.update("friendshipsWith", friendshipsWith =>
    friendshipsWith.mergeWith(
      comparators.compareShallow,
      action.friendships.getIn(["entities", "with"])
    )
  );

  return state;
};

const applyUserProfileAddFriendship = (state, action) => {
  if (!state.hasIn(["friendships", "byId"], action.friendship.get("result"))) {
    state = state.updateIn(["friendships", "allIds"], friendships =>
      friendships.push(action.friendships.get("result"))
    );
  }

  state = state.updateIn(["friendships", "byId"], friendships =>
    friendships.mergeWith(
      comparators.compareShallow,
      action.friendship.getIn(["entities", "friendship"])
    )
  );

  state = state.update("friendshipsWith", friendshipsWith =>
    friendshipsWith.mergeWith(
      comparators.compareShallow,
      action.friendships.getIn(["entities", "with"])
    )
  );

  return state;
};

const applyUserProfileUpdateFriendship = (state, action) => {
  state = state = state.updateIn(["friendships", "byId"], friendships =>
    friendships.mergeWith(
      comparators.compareShallow,
      action.friendship.getIn(["entities", "friendship"])
    )
  );

  return state;
};

const applyUserProfileDeleteFriendship = (state, action) => {
  state = state.updateIn(["friendships", "byId"], friendships =>
    friendships.delete(action.profileId)
  );

  state = state.updateIn(["friendships", "allIds"], friendships =>
    friendships.filter(f => f !== action.profileId)
  );

  state = state.update("friendshipsWith", friendships =>
    friendships.delete(action.profileId)
  );

  return state;
};

const applyUserProfileMarkFriendshipsSeen = (state, action) => {
  state = state.updateIn(["friendships", "byId"], friendships =>
    friendships.map(f => f.merge({ seen: true }))
  );

  return state;
};

export default profileReducer;
