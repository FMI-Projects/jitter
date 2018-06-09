import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import comparators from "./comparators";

const initialState = new Map({
  onlineFriends: new Map(),
  onlineFriendsList: new List()
});

const onlineFriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ONLINE_FRIENDS_SET: {
      return applyOnlineFriendsSet(state, action);
    }
    case actionTypes.ONLINE_FRIENDS_ADD: {
      return applyOnlineFriendsAdd(state, action);
    }
    case actionTypes.ONLINE_FRIENDS_REMOVE: {
      return applyOnlineFriendsRemove(state, action);
    }
    default:
      return state;
  }
};

const applyOnlineFriendsAdd = (state, action) => {
  if (!state.hasIn(["onlineFriends", action.get("result")])) {
    state = state.update("onlineFriendsList", onlineFriendsList =>
      onlineFriendsList.push(action.get("result"))
    );
  }

  state = state.update("onlineFriends", onlineFriends =>
    onlineFriends.mergeWith(
      comparators.compareShallow,
      action.onlineFriends.getIn(["entities", "profile"])
    )
  );

  return state;
};

const applyOnlineFriendsRemove = (state, action) => {
  state = state.deleteIn(["onlineFriends", action.profileId]);

  state = state.update("onlineFriendsList", onlineFriends =>
    onlineFriends.filter(f => f !== action.profileId)
  );

  return state;
};

const applyOnlineFriendsSet = (state, action) => {
  state = state.update("onlineFriends", onlineFriends =>
    onlineFriends.mergeWith(
      comparators.compareShallow,
      action.onlineFriends.getIn(["entities", "profile"])
    )
  );

  state = state.update("onlineFriendsList", onlineFriends =>
    onlineFriends.concat(new List(action.onlineFriends.get("result")))
  );

  return state;
};

export default onlineFriendsReducer;
