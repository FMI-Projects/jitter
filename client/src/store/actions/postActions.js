import * as actionTypes from "./actionTypes";

export const postsCommentsGet = postId => {
  return {
    type: actionTypes.POSTS_COMMENTS_GET,
    postId
  };
};

export const postsCommentsGetSuccess = (comments, postId) => {
  return {
    type: actionTypes.POSTS_COMMENTS_GET_SUCCESS,
    comments,
    postId
  };
};

export const postsGet = profileId => {
  return {
    type: actionTypes.POSTS_GET,
    profileId
  };
};

export const postsGetSuccess = posts => {
  return {
    type: actionTypes.PROFILE_POSTS_GET_SUCCESS,
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

export const postsCommentCreateSuccess = comment => {
  return {
    type: actionTypes.POSTS_COMMENT_CREATE_SUCCESS,
    comment
  };
};

export const postsLike = (postId, reaction) => {
  return {
    type: actionTypes.POSTS_LIKE,
    postId,
    reaction
  };
};

export const postsLikeSuccess = like => {
  return {
    type: actionTypes.POSTS_LIKE_SUCCESS,
    like
  };
};

export const postsLikesGet = postId => {
  return {
    type: actionTypes.POSTS_LIKES_GET,
    postId
  };
};

export const postsLikesGetSuccess = (postId, likes) => {
  return {
    type: actionTypes.POSTS_LIKES_GET_SUCCESS,
    postId,
    likes
  };
};
