import { put, call, takeLatest } from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { profileService } from "../../services";

function* userProfileGetInfoSaga(action) {
  try {
    const { firstName, lastName, profilePictureUrl, friendships } = yield call(
      profileService.getCurrentProfileInfo
    );
    yield put(
      actions.userProfileSetInfo(
        firstName,
        lastName,
        profilePictureUrl,
        friendships
      )
    );
  } catch (e) {}
}

function* userProfileSendFriendRequestSaga(action) {
  try {
    const friendship = yield call(
      profileService.sendFriendRequest,
      action.profileId
    );
    yield put(actions.userProfileAddFriendship(friendship));
  } catch (e) {}
}

function* userProfileUpdateFriendRequestSaga(action) {
  try {
    const friendship = yield call(
      profileService.updateFriendRequest,
      action.profileId,
      action.action
    );

    if (action.action === "Accept") {
      yield put(actions.userProfileUpdateFriendship(friendship));
    } else {
      yield put(actions.userProfileDeleteFriendship(action.profileId));
    }
  } catch (e) {}
}

function* userProfileDeleteFriendRequestSaga(action) {
  try {
    yield call(profileService.deleteFriendRequest, action.profileId);
    yield put(actions.userProfileDeleteFriendship(action.profileId));
  } catch (e) {}
}

const userProfileSagas = [
  takeLatest(actionTypes.USER_PROFILE_GET_INFO, userProfileGetInfoSaga),
  takeLatest(
    actionTypes.USER_PROFILE_SEND_FRIEND_REQUEST,
    userProfileSendFriendRequestSaga
  ),
  takeLatest(
    actionTypes.USER_PROFILE_UPDATE_FRIEND_REQUEST,
    userProfileUpdateFriendRequestSaga
  ),
  takeLatest(
    actionTypes.USER_PROFILE_DELETE_FRIEND_REQUEST,
    userProfileDeleteFriendRequestSaga
  )
];

export default userProfileSagas;
