import * as actionTypes from "./actionTypes";

export const userProfileGetInfo = () => {
  return {
    type: actionTypes.USER_PROFILE_GET_INFO
  };
};

export const userProfileSetInfo = (
  firstName,
  lastName,
  profilePictureUrl,
  friendships
) => {
  return {
    type: actionTypes.USER_PROFILE_SET_INFO,
    firstName,
    lastName,
    profilePictureUrl,
    friendships
  };
};

export const userProfileUpdate = profileData => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE,
    profileData
  };
};

export const userProfileSendFriendRequest = profileId => {
  return {
    type: actionTypes.USER_PROFILE_SEND_FRIEND_REQUEST,
    profileId
  };
};

export const userProfileUpdateFriendRequest = (profileId, action) => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE_FRIEND_REQUEST,
    profileId,
    action
  };
};

export const userProfileDeleteFriendRequest = profileId => {
  return {
    type: actionTypes.USER_PROFILE_DELETE_FRIEND_REQUEST,
    profileId
  };
};

export const userProfileAddFriendship = friendship => {
  return {
    type: actionTypes.USER_PROFILE_ADD_FRIENDSHIP,
    friendship
  };
};

export const userProfileUpdateFriendship = friendship => {
  return {
    type: actionTypes.USER_PROFILE_UPDATE_FRIENDSHIP,
    friendship
  };
};

export const userProfileDeleteFriendship = profileId => {
  return {
    type: actionTypes.USER_PROFILE_DELETE_FRIENDSHIP,
    profileId
  };
};

export const userProfileMarkFriendshipsSeen = profileId => {
  return {
    type: actionTypes.USER_PROFILE_MARK_FRIENDSHIPS_SEEN
  };
};

export const newsFeedGet = () => {
  return {
    type: actionTypes.USER_NEWS_FEED_GET
  };
};

export const newsFeedGetSuccess = posts => {
  return {
    type: actionTypes.USER_NEWS_FEED_GET_SUCCESS,
    posts
  };
};
