import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileUpdate } from "./generators/profile";

export function* profileModalUpdateSaga(action) {
  try {
    yield call(profileUpdate, action.profileData);
    yield put(actions.profileModalContinue());
  } catch (e) {
    yield put(actions.profileError(e.message));
  }
}
