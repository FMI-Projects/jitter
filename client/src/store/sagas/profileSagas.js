import { put, call, takeLatest } from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { profileService } from "../../services";

function* profilePostsGetSaga(action) {
  try {
    const posts = yield call(profileService.getProfilePosts, action.profileId);
    console.log(posts);
    yield put(actions.postsGetSuccess(posts));
  } catch (e) {}
}

function* profileGetSaga(action) {
  try {
    const profile = yield call(profileService.getProfileInfo, action.profileId);
    yield put(actions.profileGetSuccess(profile));
  } catch (e) {}
}

const profileSagas = [
  takeLatest(actionTypes.PROFILE_POSTS_GET, profilePostsGetSaga),
  takeLatest(actionTypes.PROFILE_GET, profileGetSaga)
];

export default profileSagas;
