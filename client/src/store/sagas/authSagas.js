import { put, call, fork } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import * as actions from "../actions";
import { userService, storageService } from "../../services";
import * as formatError from "../../utilities/formatters/formatError";
import * as socket from "./sockets/io";

export function* authLoginSaga(action) {
  try {
    const userData = yield call(
      userService.loginUser,
      action.payload.email,
      action.payload.password
    );

    yield call(storageService.storeUser, userData.token, userData.userId);
    yield fork(socket.openSocket, userData.token);

    yield put(actions.authSuccess(userData.userId, userData.token));
    yield put(actions.login.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });
    yield put(actions.login.failure(formError));
  }
}

export function* authRegisterSaga(action) {
  try {
    const userData = yield call(
      userService.registerUser,
      action.payload.email,
      action.payload.password,
      action.payload.firstName,
      action.payload.lastName
    );

    yield call(storageService.storeUser, userData.token, userData.userId);
    yield fork(socket.openSocket, userData.token);

    yield put(actions.authSuccess(userData.userId, userData.token));
    yield put(actions.authFirstLogin());
    yield put(actions.register.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });
    yield put(actions.register.failure(formError));
  }
}

export function* authLogoutSaga() {
  yield call(storageService.removeUser);
  yield call(socket.closeSocket);
  yield put(actions.reset());
}

export function* authInitSaga(action) {
  const { userId, token } = yield call(storageService.getUser);
  if (userId && token) {
    yield fork(socket.openSocket, token);
    yield put(actions.authSuccess(userId, token));
  } else {
    yield put(actions.reset());
  }
}
