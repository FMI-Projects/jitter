import { takeLatest, takeEvery, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import * as authSagas from "./authSagas";
import * as userProfileSagas from "./userProfileSagas";
import * as userProfileModalSagas from "./userProfileModalSagas";
import * as profileSagas from "./profileSagas";
import * as actions from "../actions";

export function* watchAuth() {
  yield all([
    takeLatest(actions.login.REQUEST, authSagas.authLoginSaga),
    takeLatest(actions.register.REQUEST, authSagas.authRegisterSaga),
    takeLatest(actionTypes.AUTH_INIT, authSagas.authInitSaga),
    takeLatest(actionTypes.AUTH_LOGOUT, authSagas.authLogoutSaga)
  ]);
}

export function* watchUserProfile() {
  yield all([
    takeLatest(actionTypes.USER_PROFILE_GET_INFO, userProfileSagas.userProfileGetInfoSaga)
  ]);
}

export function* watchUserProfileModal() {
  yield all([
    takeLatest(
      actions.userProfilePatch.REQUEST,
      userProfileModalSagas.userProfileModalUpdateSaga
    ),
    takeLatest(
      actions.userProfilePicture.REQUEST,
      userProfileModalSagas.userProfileModalPictureSaga
    )
  ]);
}

export function* watchProfile() {
  yield all([
    takeEvery(actionTypes.PROFILE_POSTS_GET, profileSagas.profilePostsGetSaga)
  ]);
}
