import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";

const initialState = new Map({
  onlineFriends: new List()
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
  const existingFriend = state
    .get("onlineFriends")
    .find(f => f.get("_id") === action.friendId);

  const friend = new Map({
    ...action.friend,
    profilePictureUrl: formatImage.getFullUrl(action.friend.profilePictureUrl)
  });

  if (existingFriend) {
    const friendIndex = state.get("onlineFriends").indexOf(existingFriend);

    return state.update("onlineFriends", onlineFriends =>
      onlineFriends.set(friendIndex, friend)
    );
  } else {
    return state.update("onlineFriends", onlineFriends =>
      onlineFriends.unshift(friend)
    );
  }
};

const applyOnlineFriendsRemove = (state, action) => {
  const friend = state
    .get("onlineFriends")
    .find(f => f.get("_id") === action.profileId);
  const friendIndex = state.get("onlineFriends").indexOf(friend);

  return state.update("onlineFriends", onlineFriends =>
    onlineFriends.delete(friendIndex)
  );
};

const applyOnlineFriendsSet = (state, action) => {
  const onlineFriends = new List(
    action.onlineFriends.map(
      ofr =>
        new Map({
          ...ofr,
          profilePictureUrl: formatImage.getFullUrl(ofr.profilePictureUrl)
        })
    )
  );

  return state.set("onlineFriends", onlineFriends);
};

export default onlineFriendsReducer;
