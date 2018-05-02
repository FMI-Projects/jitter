import {takeLatest, all} from "redux-saga/effects";

import {AUTH_USER} from "../actions/actionTypes";

import {authUserSaga} from "./authSagas";

export function* watchAuth() {
  yield all([takeLatest(AUTH_USER, authUserSaga)]);
}
