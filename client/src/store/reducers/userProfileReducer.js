import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import _ from "lodash";

const initialState = {
  firstName: null,
  lastName: null,
  profilePictureUrl: null,
  friendships: []
};

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
  const newState = _.cloneDeep(state);
  const profilePictureUrl = formatImage.getFullUrl(action.profilePictureUrl);

  newState.firstName = action.firstName;
  newState.lastName = action.lastName;
  newState.profilePictureUrl = profilePictureUrl;

  newState.friendships = action.friendships.map(f => {
    f.with.profilePictureUrl = formatImage.getFullUrl(f.with.profilePictureUrl);
    return f;
  });

  return newState;
};

const applyUserProfileAddFriendship = (state, action) => {
  const newState = _.cloneDeep(state);

  const existingFriendship = newState.friendships.find(
    f => f.with._id === action.friendship.with._id
  );

  const friendship = _.cloneDeep(action.friendship);
  friendship.with.profilePictureUrl = formatImage.getFullUrl(
    friendship.with.profilePictureUrl
  );

  if (existingFriendship) {
    const friendshipIndex = newState.friendships.indexOf(existingFriendship);

    newState.friendships[friendshipIndex] = friendship;
  } else {
    newState.friendships.push(friendship);
  }

  return newState;
};

const applyUserProfileUpdateFriendship = (state, action) => {
  const newState = _.cloneDeep(state);

  const existingFriendship = newState.friendships.find(
    f => f.with._id === action.friendship.with._id
  );
  const friendshipIndex = newState.friendships.indexOf(existingFriendship);

  const friendship = _.cloneDeep(action.friendship);
  friendship.with.profilePictureUrl = formatImage.getFullUrl(
    friendship.with.profilePictureUrl
  );

  newState.friendships[friendshipIndex] = friendship;

  return newState;
};

const applyUserProfileDeleteFriendship = (state, action) => {
  const newState = _.cloneDeep(state);

  const friendship = newState.friendships.find(
    f => f.with._id === action.profileId
  );
  const friendshipIndex = newState.friendships.indexOf(friendship);

  newState.friendships.splice(friendshipIndex, 1);

  return newState;
};

const applyUserProfileMarkFriendshipsSeen = (state, action) => {
  const newState = _.cloneDeep(state);

  newState.friendships.map(f => {
    f.seen = true;
    return f;
  });

  return newState;
};

export default profileReducer;
