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
    default:
      return state;
  }
};

const applyOnlineFriendsAdd = (state, action) => {
  const newState = _.cloneDeep(state);

  const friend = newState.onlineFriends.some(f => (f._id = action.friend._id));

  action.friend.profilePictureUrl = formatImage.getFullUrl(
    action.friend.profilePictureUrl
  );

  if (friend) {
    const friendIndex = state.onlineFriends.indexOf(friend);

    newState.onlineFriends[friendIndex] = action.friend;
  } else {
    newState.onlineFriends.push(action.friend);
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
  action.onlineFriends = action.onlineFriends.map(f => {
    f.profilePictureUrl = formatImage.getFullUrl(f.profilePictureUrl);
    return f;
  });
  newState.onlineFriends = action.onlineFriends;
  return newState;
};

export default onlineFriendsReducer;
