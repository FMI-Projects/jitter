import * as actionTypes from "./actionTypes";

export const userPostsGet = profileId => {
  return {
    type: actionTypes.USER_POSTS_GET,
    profileId
  };
};

export const userPostsGetSuccess = posts => {
  return {
    type: actionTypes.USER_POSTS_GET_SUCCESS,
    posts
  };
};
