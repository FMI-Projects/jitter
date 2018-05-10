import * as actionTypes from "../actions/actionTypes";

const initialState = {
  comments: []
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
  // TODO fix issue with different post comments overwriting each other
  return {...state, comments: action.comments};
};

export default postReducer;
