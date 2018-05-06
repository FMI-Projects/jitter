import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { userService, storageService } from "../../services";

export function* authUserSaga(action) {
  try {
    yield put(actions.authLoad());

    const userData = yield call(
      [userService, "loginUser"],
      action.email,
      action.password
    );

    yield call([storageService, "storeUser"], userData.token, userData.userId);

    yield put(actions.authSuccess(userData.userId, userData.token));
  } catch (e) {
    yield put(actions.authError(e.message));
  }
}

export function* authLogoutInitSaga() {
  yield call([storageService, "removeUser"]);
  yield put(actions.authLogoutSuccess());
}

export function* authInitSaga(action) {
  const { userId, token } = yield call([storageService, "getUser"]);
  if (userId && token) {
    yield put(actions.authSuccess(userId, token));
  } else {
    yield put(actions.authLogoutSuccess());
  }
}

export function* authRegisterInitSaga(action) {
  try {
    yield put(actions.authLoad());

    const userData = yield call(
      [userService, "registerUser"],
      action.email,
      action.password,
      action.firstName,
      action.lastName
    );

    yield call([storageService, "storeUser"], userData.token, userData.userId);

    yield put(actions.authSuccess(userData.userId, userData.token));
    yield put(actions.authFirstLogin());
  } catch (e) {
    yield put(actions.authError(e.message));
  }
}
