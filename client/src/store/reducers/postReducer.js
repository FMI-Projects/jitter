import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  posts: [],
  loading: false
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
  post.comments = action.comments;
  post.loading = false;
  return newState;
};

const applyPostsCreateSuccess = (state, action) => {
  const newState = _.cloneDeep(state);
  const posts = newState.posts;
  posts.unshift(action.post);
  return newState;
};

export default postReducer;
