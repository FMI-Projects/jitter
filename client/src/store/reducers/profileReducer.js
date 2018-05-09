import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_POSTS_GET_SUCCESS: {
      return applyUserPosts(state, action);
    }
    default:
      return state;
  }
};

const applyUserPosts = (state, action) => {
  return {...state, posts: action.posts};
};

export default profileReducer;
