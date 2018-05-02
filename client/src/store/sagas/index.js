import { takeLatest, all } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import { authUserSaga, authInitSaga, authLogoutInitSaga } from "./authSagas";

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.AUTH_USER, authUserSaga),
    takeLatest(actionTypes.AUTH_INIT, authInitSaga),
    takeLatest(actionTypes.AUTH_LOGOUT_INIT, authLogoutInitSaga)
  ]);
}
