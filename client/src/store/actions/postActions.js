import * as actionTypes from "./actionTypes";

export const postCommentsGet = postId => {
  return {
    type: actionTypes.POST_COMMENTS_GET,
    postId
  };
};

export const postCommentsGetSuccess = comments => {
  return {
    type: actionTypes.POST_COMMENTS_GET_SUCCESS,
    comments
  };
};
