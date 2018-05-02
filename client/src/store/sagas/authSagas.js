import {put, call} from "redux-saga/effects";

import axios from "axios";

import * as actions from "../actions/index";

export function* authUserSaga(action) {
  const authData = {
    email: action.email,
    password: action.password,
  };

  try {
    const loginUrl = "http://localhost:8000/auth/login";

    const response = yield call([axios, "post"], loginUrl, authData);

    const expirationDate = new Date(new Date().getTime() + 604800);

    console.log(response);

    yield call([localStorage, "setItem"], "token", response.headers["x-auth"]);
    yield call([localStorage, "setItem"], "userId", response._id);
    yield call([localStorage, "setItem"], "expirationDate", expirationDate);

    yield put(actions.authSuccess());
  } catch (e) {
    yield put(actions.authFail(e.message));
  }
}
