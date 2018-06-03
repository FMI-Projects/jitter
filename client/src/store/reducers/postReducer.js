import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import _ from "lodash";

const initialState = {
  posts: [],
  commentsLoading: true,
  likesLoading: true
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POSTS_COMMENTS_GET: {
      return applyPostsCommentsGet(state, action);
    }
    case actionTypes.POSTS_COMMENTS_GET_SUCCESS: {
      return applyPostsCommentsGetSuccess(state, action);
    }
    case actionTypes.PROFILE_POSTS_GET: {
      return applyPostsGet(state, action);
    }
    case actionTypes.POSTS_GET_SUCCESS: {
      return applyPostsGetSuccess(state, action);
    }
    case actionTypes.POSTS_CREATE_SUCCESS: {
      return applyPostsCreateSuccess(state, action);
    }
    case actionTypes.POSTS_UPDATE_SUCCESS: {
      return applyPostsUpdateSuccess(state, action);
    }
    case actionTypes.POSTS_DELETE_SUCCESS: {
      return applyPostsDeleteSuccess(state, action);
    }
    case actionTypes.POSTS_COMMENT_CREATE_SUCCESS: {
      return applyPostsCommentCreateSuccess(state, action);
    }
    case actionTypes.COMMENTS_DELETE_SUCCESS: {
      return applyCommentsDeleteSuccess(state, action);
    }
    case actionTypes.COMMENTS_UPDATE_SUCCESS: {
      return applyCommentsUpdateSuccess(state, action);
    }
    case actionTypes.POSTS_LIKE_SUCCESS: {
      return applyPostsLikeSuccess(state, action);
    }
    case actionTypes.POSTS_LIKES_GET: {
      return applyPostsLikesGet(state, action);
    }
    case actionTypes.POSTS_LIKES_GET_SUCCESS: {
      return applyPostsLikesGetSuccess(state, action);
    }
    default:
      return state;
  }
};

const applyPostsGet = (state, action) => {
  const newState = _.cloneDeep(state);
  newState.loading = true;
  return newState;
};

const applyPostsGetSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  action.posts.forEach(p => (p.imageUrl = formatImage.getFullUrl(p.imageUrl)));
  newState.posts = action.posts;
  newState.loading = false;
  return newState;
};

const applyPostsCommentsGet = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.commentsLoading = true;
  return newState;
};

const applyPostsCommentsGetSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.post);
  action.comments.forEach(
    c =>
      (c.author.profilePictureUrl = formatImage.getFullUrl(
        c.author.profilePictureUrl
      ))
  );
  post.comments = action.comments;
  post.commentsLoading = false;
  return newState;
};

const applyPostsCreateSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const posts = newState.posts;
  action.post.imageUrl = formatImage.getFullUrl(action.post.imageUrl);
  posts.unshift(action.post);
  return newState;
};

const applyPostsUpdateSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.post._id);
  post.imageUrl = formatImage.getFullUrl(action.post.imageUrl);
  post.title = action.post.title;
  post.content = action.post.content;
  return newState;
};

const applyPostsDeleteSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  newState.posts = newState.posts.filter(p => p._id !== action.postId);
  return newState;
};

const applyPostsCommentCreateSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.comments.push(action.comment);
  return newState;
};

const applyCommentsDeleteSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.comments = post.comments.filter(c => c._id !== action.commentId);
  return newState;
};

const applyCommentsUpdateSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.comment.post);
  const comment = post.comments.find(c => c._id === action.comment._id);
  comment.content = action.comment.content;
  return newState;
};

const applyPostsLikeSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.like.post);
  post.likes.push(action.like);

  return newState;
};

const applyPostsLikesGet = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.likesLoading = true;
  return newState;
};

const applyPostsLikesGetSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.likes = action.likes;
  post.likesLoading = false;

  return newState;
};

export default postReducer;
