import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* userProfileGetInfoSaga(action) {
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

export function* userProfileSendFriendRequestSaga(action) {
  try {
    const friendship = yield call(
      profileService.sendFriendRequest,
      action.profileId
    );
    yield put(actions.userProfileAddFriendship(friendship));
  } catch (e) {}
}

export function* userProfileUpdateFriendRequestSaga(action) {
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

export function* userProfileDeleteFriendRequestSaga(action) {
  try {
    yield call(profileService.deleteFriendRequest, action.profileId);
    yield put(actions.userProfileDeleteFriendship(action.profileId));
  } catch (e) {}
}
