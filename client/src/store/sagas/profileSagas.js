import { put, call, takeLatest } from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { profileService } from "../../services";
import normalisers from "./normalizr/normalisers";
import toNormalisedImmutable from "./utilities/toNormalisedImmutable";

function* profilePostsGetSaga(action) {
  try {
    let posts = yield call(profileService.getProfilePosts, action.profileId);

    posts = yield call(
      toNormalisedImmutable,
      posts,
      normalisers.postsListNormaliser
    );

    yield put(actions.postsGetSuccess(posts));
  } catch (e) {}
}

function* profileGetSaga(action) {
  try {
    let profile = yield call(profileService.getProfileInfo, action.profileId);

    profile = yield call(
      toNormalisedImmutable,
      profile,
      normalisers.profileNormaliser
    );

    yield put(actions.profileGetSuccess(profile));
  } catch (e) {}
}

const profileSagas = [
  takeLatest(actionTypes.PROFILE_POSTS_GET, profilePostsGetSaga),
  takeLatest(actionTypes.PROFILE_GET, profileGetSaga)
];

export default profileSagas;
