import { put, call, takeLatest } from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { profileService } from "../../services";
import normalisers from "./normalizr/normalisers";
import toNormalisedImmutable from "./utilities/toNormalisedImmutable";

function* userProfileGetInfoSaga(action) {
  try {
    const { firstName, lastName, profilePictureUrl, friendships } = yield call(
      profileService.getCurrentProfileInfo
    );

    const friendshipData = yield call(
      toNormalisedImmutable,
      friendships,
      normalisers.friendshipListNormaliser
    );

    yield put(
      actions.userProfileSetInfo(
        firstName,
        lastName,
        profilePictureUrl,
        friendshipData
      )
    );
  } catch (e) {}
}

function* userProfileSendFriendRequestSaga(action) {
  try {
    let friendship = yield call(
      profileService.sendFriendRequest,
      action.profileId
    );

    friendship = yield call(
      toNormalisedImmutable,
      friendship,
      normalisers.friendshipNormaliser
    );

    yield put(actions.userProfileAddFriendship(friendship));
  } catch (e) {}
}

function* userProfileUpdateFriendRequestSaga(action) {
  try {
    let friendship = yield call(
      profileService.updateFriendRequest,
      action.profileId,
      action.action
    );

    if (action.action === "Accept") {
      friendship = yield call(
        toNormalisedImmutable,
        friendship,
        normalisers.friendshipNormaliser
      );

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

function* newsFeedGetSaga(action) {
  try {
    let posts = yield call(profileService.getNewsFeed);

    posts = yield call(
      toNormalisedImmutable,
      posts,
      normalisers.postsListNormaliser
    );

    yield put(actions.newsFeedGetSuccess(posts));
  } catch (e) {}
}

const userProfileSagas = [
  takeLatest(actionTypes.USER_PROFILE_GET_INFO, userProfileGetInfoSaga),
  takeLatest(actionTypes.USER_NEWS_FEED_GET, newsFeedGetSaga),
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
