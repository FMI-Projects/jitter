import { takeLatest, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import * as sagas from "./authSagas";

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_USER, sagas.authUserSaga),
    takeLatest(actionTypes.AUTH_INIT, sagas.authInitSaga),
    takeLatest(actionTypes.AUTH_LOGOUT_INIT, sagas.authLogoutInitSaga),
    takeLatest(actionTypes.AUTH_REGISTER_INIT, sagas.authRegisterInitSaga)
  ]);
}
