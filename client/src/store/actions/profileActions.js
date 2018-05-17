import * as actionTypes from "./actionTypes";

export const profileGet = profileId => {
  return {
    type: actionTypes.PROFILE_GET,
    profileId
  };
};

export const profileGetSuccess = ({
  _id,
  firstName,
  lastName,
  profilePictureUrl,
  gender,
  bio,
  birthday,
  friendships
}) => {
  return {
    type: actionTypes.PROFILE_GET_SUCCESS,
    _id,
    firstName,
    lastName,
    profilePictureUrl,
    gender,
    bio,
    birthday,
    friendships
  };
};
