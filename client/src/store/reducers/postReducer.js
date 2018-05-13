import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  posts: [],
  loading: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_COMMENTS_GET: {
      return applyCommentsGet(state, action);
    }
    case actionTypes.POST_COMMENTS_GET_SUCCESS: {
      return applyPostComments(state, action);
    }
    case actionTypes.POSTS_GET: {
      return applyPostsGet(state, action);
    }
    case actionTypes.POSTS_GET_SUCCESS: {
      return applyPosts(state, action);
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

const applyPosts = (state, action) => {
  const newState = _.cloneDeep(state);
  newState.posts = action.posts;
  newState.loading = false;
  return newState;
};

const applyCommentsGet = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.postId);
  post.loading = true;
  return newState;
};

const applyPostComments = (state, action) => {
  const newState = _.cloneDeep(state);
  const post = newState.posts.find(p => p._id === action.post);
  post.comments = action.comments;
  post.loading = false;
  return newState;
};

export default postReducer;
