import { put, call } from "redux-saga/effects";

import * as actions from "../actions/index";
import { userService, storageService } from "../../services";

export function* authUserSaga(action) {
  try {
    const userData = yield call(
      [userService, "loginUser"],
      action.email,
      action.password
    );

    yield call([storageService, "storeUser"], userData.token, userData._id);

    yield put(actions.authSuccess(userData.token, userData._id));
  } catch (e) {
    yield put(actions.authError(e.message));
  }
}

export function* authLogoutSaga() {
  yield call([storageService, "removeUser"]);
  yield put(actions.authLogoutSuccess());
}

export function* authInitSaga(action) {
  const { userId, token } = yield call([storageService, "getUser"]);
  yield put(action.authSuccess(userId, token));
}
