import { put, call } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import * as actions from "../actions";
import { profileUpdate } from "./generators/profile";

export function* profileModalUpdateSaga(action) {
  try {
    yield call(profileUpdate, action.payload);
    yield put(actions.profileModalContinue());
    yield put(actions.profilePatch.success());
  } catch (e) {
    const formError = new SubmissionError({
      _error: e.message
    });
    yield put(actions.profilePatch.failure(formError));
  }
}
