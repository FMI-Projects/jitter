import { takeLatest, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import * as authSagas from "./authSagas";
import * as profileSagas from "./profileSagas";
import * as profileModalSagas from "./profileModalSagas";

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_USER, authSagas.authUserSaga),
    takeLatest(actionTypes.AUTH_INIT, authSagas.authInitSaga),
    takeLatest(actionTypes.AUTH_LOGOUT_INIT, authSagas.authLogoutInitSaga),
    takeLatest(actionTypes.AUTH_REGISTER_INIT, authSagas.authRegisterInitSaga)
  ]);
}

export function* watchProfile() {
  yield all([
    takeLatest(actionTypes.PROFILE_GET_INFO, profileSagas.profileGetInfoSaga),
    takeLatest(actionTypes.PROFILE_UPDATE, profileSagas.profileUpdateSaga)
  ]);
}

export function* watchProfileModal() {
  yield all([
    takeLatest(
      actionTypes.PROFILE_MODAL_UPDATE,
      profileModalSagas.profileModalUpdateSaga
    )
  ]);
}
