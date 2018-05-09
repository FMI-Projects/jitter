import * as actionTypes from "./actionTypes";

export const userPostsGet = () => {
  return {
    type: actionTypes.USER_POSTS_GET
  };
};

export const userPostsGetSuccess = posts => {
  return {
    type: actionTypes.USER_POSTS_GET_SUCCESS,
    posts
  };
};
