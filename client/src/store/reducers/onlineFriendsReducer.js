import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import _ from "lodash";

const initialState = {
  onlineFriends: []
};

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
    case actionTypes.USER_PROFILE_DELETE_FRIENDSHIP: {
      return applyOnlineFriendsRemove(state, action);
    }
    case actionTypes.USER_PROFILE_UPDATE_FRIENDSHIP: {
      return applyOnlineFriendsNewFriend(state, action);
    }
    default:
      return state;
  }
};

const applyOnlineFriendsNewFriend = (state, action) => {
  if (action.friendship.status === "Accepted") {
    action.friend = { ...action.friendship.with };
    return applyOnlineFriendsAdd(state, action);
  }

  return _.cloneDeep(state);
};

const applyOnlineFriendsAdd = (state, action) => {
  const newState = _.cloneDeep(state);

  const existingFriend = newState.onlineFriends.some(
    f => f._id === action.friend._id
  );

  const friend = { ...action.friend };
  friend.profilePictureUrl = formatImage.getFullUrl(friend.profilePictureUrl);

  if (existingFriend) {
    const friendIndex = state.onlineFriends.indexOf(existingFriend);

    newState.onlineFriends[friendIndex] = friend;
  } else {
    newState.onlineFriends.unshift(friend);
  }

  return newState;
};

const applyOnlineFriendsRemove = (state, action) => {
  const newState = _.cloneDeep(state);

  const friend = newState.onlineFriends.find(f => f._id === action.profileId);
  const friendIndex = newState.onlineFriends.indexOf(friend);

  newState.onlineFriends.splice(friendIndex, 1);

  return newState;
};

const applyOnlineFriendsSet = (state, action) => {
  const newState = _.cloneDeep(state);

  let onlineFriends = _.cloneDeep(action.onlineFriends);
  onlineFriends = onlineFriends.map(f => {
    f.profilePictureUrl = formatImage.getFullUrl(f.profilePictureUrl);
    return f;
  });

  newState.onlineFriends = onlineFriends;
  return newState;
};

export default onlineFriendsReducer;
