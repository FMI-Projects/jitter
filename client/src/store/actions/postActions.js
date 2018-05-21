import * as actionTypes from "./actionTypes";

export const postCommentsGet = postId => {
  return {
    type: actionTypes.POST_COMMENTS_GET,
    postId
  };
};

export const postCommentsGetSuccess = (comments, post) => {
  return {
    type: actionTypes.POST_COMMENTS_GET_SUCCESS,
    comments,
    post
  };
};

export const postsGet = profileId => {
  return {
    type: actionTypes.PROFILE_POSTS_GET,
    profileId
  };
};

export const postsGetSuccess = posts => {
  return {
    type: actionTypes.POSTS_GET_SUCCESS,
    posts
  };
};

export const postsCreateSuccess = post => {
  return {
    type: actionTypes.POSTS_CREATE_SUCCESS,
    post
  };
};

export const postsUpdateSuccess = post => {
  return {
    type: actionTypes.POSTS_UPDATE_SUCCESS,
    post
  };
};

export const postsDelete = postId => {
  return {
    type: actionTypes.POSTS_DELETE,
    postId
  };
};

export const postsDeleteSuccess = postId => {
  return {
    type: actionTypes.POSTS_DELETE_SUCCESS,
    postId
  };
};

export const postsCommentCreateSuccess = (comment, postId) => {
  return {
    type: actionTypes.POSTS_COMMENT_CREATE_SUCCESS,
    postId,
    comment
  };
};
