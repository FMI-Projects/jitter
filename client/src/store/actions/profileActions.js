import * as actionTypes from "./actionTypes";

export const profilePostsGet = profileId => {
  return {
    type: actionTypes.PROFILE_POSTS_GET,
    profileId
  };
};

export const profilePostsGetSuccess = posts => {
  return {
    type: actionTypes.PROFILE_POSTS_GET_SUCCESS,
    posts
  };
};
