import * as actionTypes from "./actionTypes";

export const commentsDelete = (postId, commentId) => {
  return {
    type: actionTypes.COMMENTS_DELETE,
    postId,
    commentId
  };
};

export const commentsDeleteSuccess = (postId, commentId) => {
  return {
    type: actionTypes.COMMENTS_DELETE_SUCCESS,
    postId,
    commentId
  };
};
