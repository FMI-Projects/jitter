import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* profilePostsGetSaga(action) {
  try {
    const data = yield call(profileService.getProfilePosts, action.profileId);

    yield put(actions.postsGetSuccess(data));
  } catch (e) {}
}

export function* profileGetSaga(action) {
  try {
    const data = yield call(profileService.getProfileInfo, action.profileId);

    yield put(actions.profileGetSuccess(data));
  } catch (e) {}
}
