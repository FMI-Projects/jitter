import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileUpdateSaga } from "./profileSagas";

export function* profileModalUpdateSaga(action) {
  yield call(profileUpdateSaga, action);
  yield put(actions.profileModalContinue);
}
