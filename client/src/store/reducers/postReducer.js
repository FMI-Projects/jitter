import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import _ from "lodash";

const initialState = {
  posts: [],
  loading: true
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_COMMENTS_GET: {
      return applyPostCommentsGet(state, action);
    }
    case actionTypes.POST_COMMENTS_GET_SUCCESS: {
      return applyPostCommentsGetSuccess(state, action);
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

const applyPostCommentsGet = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.loading = true;
  return newState;
};

const applyPostCommentsGetSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.post);
  action.comments.forEach(
    c =>
      (c.author.profilePictureUrl = formatImage.getFullUrl(
        c.author.profilePictureUrl
      ))
  );
  post.comments = action.comments;
  post.loading = false;
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
  newState.posts = newState.posts.filter(p => p._id !== action.post._id);
  return newState;
};

const applyPostsCommentCreateSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.comments.unshift(action.comment);
  return newState;
};

export default postReducer;
