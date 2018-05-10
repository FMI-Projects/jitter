import * as actionTypes from "../actions/actionTypes";

const initialState = {
  comments: {}
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_COMMENTS_GET_SUCCESS: {
      return applyPostComments(state, action);
    }
    default:
      return state;
  }
};

const applyPostComments = (state, action) => {
  const stateComments = {
    ...state.comments,
    [action.post]: {
      comments: action.comments.comments,
      post: action.comments.post,
      author: action.comments.author
    }
  };
  return {comments: stateComments};
};

export default postReducer;
