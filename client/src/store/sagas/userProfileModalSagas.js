import { put, call } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import * as actions from "../actions";
import { userProfileUpdate } from "./generators/profile";

export function* userProfileModalUpdateSaga(action) {
  try {
    yield call(userProfileUpdate, action.payload);
    yield put(actions.userProfileModalContinue());
    yield put(actions.userProfilePatch.success());
  } catch (e) {
    const formError = new SubmissionError({
      _error: e.message
    });
    yield put(actions.userProfilePatch.failure(formError));
  }
}

export function* userProfileModalPictureSaga(action) {
  try {
    yield console.log(action);
  } catch (e) {}
}
