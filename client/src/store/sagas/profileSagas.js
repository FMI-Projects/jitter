import { put, call, takeLatest } from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { profileService } from "../../services";

function* profilePostsGetSaga(action) {
  try {
    const data = yield call(profileService.getProfilePosts, action.profileId);

    yield put(actions.postsGetSuccess(data));
  } catch (e) {}
}

function* profileGetSaga(action) {
  try {
    const data = yield call(profileService.getProfileInfo, action.profileId);
    yield put(actions.profileGetSuccess(data));
  } catch (e) {}
}

const profileSagas = [
  takeLatest(actionTypes.PROFILE_POSTS_GET, profilePostsGetSaga),
  takeLatest(actionTypes.PROFILE_GET, profileGetSaga)
];

export default profileSagas;
