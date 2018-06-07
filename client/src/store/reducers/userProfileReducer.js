import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import normalizers from "./normalizers";

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

  const normalizedFriendships = action.friendships.map(f =>
    normalizers.friendshipNormalizer(f)
  );

  state = addFriendships(
    state,
    normalizedFriendships.map(f => f.normalizedFriendship)
  );
  state = addFriendshipsWith(state, normalizedFriendships.map(f => f.with));

  return state;
};

const applyUserProfileAddFriendship = (state, action) => {
  const normalizedFriendship = normalizers.friendshipNormalizer(
    action.friendship
  );

  const existingFriendship = state.getIn([
    "friendships",
    "byId",
    normalizedFriendship.normalizedFriendship._id
  ]);

  if (existingFriendship) {
    state = state.updateIn(
      ["friendships", "byId", normalizedFriendship.normalizedFriendship._id],
      friendship => friendship.merge(normalizedFriendship.normalizedFriendship)
    );
  } else {
    state = addFriendships(state, [normalizedFriendship.normalizedFriendship]);
    state = addFriendshipsWith(state, [normalizedFriendship.with]);
  }

  return state;
};

const applyUserProfileUpdateFriendship = (state, action) => {
  const normalizedFriendship = normalizers.friendshipNormalizer(
    action.friendship
  );

  state = state.updateIn(
    [
      "friendships",
      "byId",
      normalizedFriendship.normalizedFriendship._id
    ],
    friendship => friendship.merge(normalizedFriendship.normalizedFriendship)
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

const addFriendships = (state, friendships) => {
  state = state.updateIn(["friendships", "byId"], existingFriendships =>
    existingFriendships.merge(
      ...friendships.map(f => {
        return new Map({
          [f._id]: new Map({
            ...f
          })
        });
      })
    )
  );

  state = state.updateIn(["friendships", "allIds"], allIds =>
    new List(friendships.map(f => f._id)).concat(allIds)
  );

  return state;
};

const addFriendshipsWith = (state, friendships) => {
  state = state.update("friendshipsWith", existingFriendships =>
    existingFriendships.merge(
      ...friendships.map(f => {
        return new Map({
          [f._id]: new Map({
            ...f,
            profilePictureUrl: formatImage.getFullUrl(f.profilePictureUrl)
          })
        });
      })
    )
  );

  return state;
};

export default profileReducer;
