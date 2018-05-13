import * as actionTypes from "../actions/actionTypes";

const initialState = {
  comments: {},
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
  return {...state, loading: true};
};

const applyCommentsGet = (state, action) => {
  const stateComments = {
    ...state.comments,
    [action.postId]: {loading: true}
  };

  return {...state, comments: stateComments};
};

const applyPostComments = (state, action) => {
  const stateComments = {
    ...state.comments,
    [action.post]: {
      comments: action.comments,
      loading: false
    }
  };

  return {...state, comments: stateComments};
};

const applyPosts = (state, action) => {
  return {...state, posts: action.posts, loading: false};
};

export default postReducer;
