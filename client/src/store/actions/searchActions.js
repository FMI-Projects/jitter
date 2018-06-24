import * as actionTypes from "./actionTypes";

export const searchGet = searchQuery => {
  return {
    type: actionTypes.SEARCH_GET,
    searchQuery
  };
};

export const searchGetSuccess = profiles => {
  return {
    type: actionTypes.SEARCH_GET_SUCCESS,
    profiles
  };
};

export const searchClear = () => {
  return {
    type: actionTypes.SEARCH_CLEAR
  };
};
