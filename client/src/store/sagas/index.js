import { all } from "redux-saga/effects";

import authSagas from "./authSagas";
import userProfileSagas from "./userProfileSagas";
import userProfileModalSagas from "./userProfileModalSagas";
import postSagas from "./postSagas";
import profileSagas from "./profileSagas";
import commentSagas from "./commentSagas";
import searchSagas from "./searchSagas";

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...userProfileSagas,
    ...userProfileModalSagas,
    ...postSagas,
    ...profileSagas,
    ...commentSagas,
    ...searchSagas
  ]);
}
