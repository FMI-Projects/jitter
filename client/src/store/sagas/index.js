import { takeLatest, takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import * as authSagas from "./authSagas";
import * as profileSagas from "./profileSagas";
import * as profileModalSagas from "./profileModalSagas";
import * as postsSagas from "./postsSagas";
import * as actions from "../actions";

export function* watchAuth() {
  yield all([
    takeLatest(actions.login.REQUEST, authSagas.authLoginSaga),
    takeLatest(actions.register.REQUEST, authSagas.authRegisterSaga),
    takeLatest(actionTypes.AUTH_INIT, authSagas.authInitSaga),
    takeLatest(actionTypes.AUTH_LOGOUT, authSagas.authLogoutSaga)
  ]);
}

export function* watchProfile() {
  yield all([
    takeLatest(actionTypes.PROFILE_GET_INFO, profileSagas.profileGetInfoSaga)
  ]);
}

export function* watchProfileModal() {
  yield all([
    takeLatest(
      actions.profilePatch.REQUEST,
      profileModalSagas.profileModalUpdateSaga
    ),
    takeLatest(
      actions.profilePicture.REQUEST,
      profileModalSagas.profileModalPictureSaga
    )
  ]);
}

export function* watchPosts() {
  yield all([
    takeEvery(actionTypes.USER_POSTS_GET, postsSagas.userPostsGetSaga)
  ]);
}
