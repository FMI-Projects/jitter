import { put, call, takeLatest } from "redux-saga/effects";
import { SubmissionError } from "redux-form/immutable";

import * as actions from "../actions";
import { imageService } from "../../services";
import { userProfileUpdate } from "./generators/profile";
import * as formatError from "../../utilities/formatters/formatError";

function* userProfileModalUpdateSaga(action) {
  try {
    yield call(userProfileUpdate, action.payload.toJS());
    yield put(actions.userProfileModalContinue());
    yield put(actions.userProfilePatch.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });
    yield put(actions.userProfilePatch.failure(formError));
  }
}

function* userProfileModalPictureSaga(action) {
  try {
    yield put(actions.userProfilePatch.success());
    if (action.payload.get("profilePicture")) {
      const { url, key } = yield call(imageService.getSignedUrl);
      yield call(
        imageService.uploadImage,
        url,
        action.payload.get("profilePicture")
      );
      yield call(userProfileUpdate, { profilePictureUrl: key });
    }
    yield put(actions.userProfileModalContinue());
    yield put(actions.userProfilePicture.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });
    yield put(actions.userProfilePicture.failure(formError));
  }
}

const userProfileModalSagas = [
  takeLatest(actions.userProfilePatch.REQUEST, userProfileModalUpdateSaga),
  takeLatest(actions.userProfilePicture.REQUEST, userProfileModalPictureSaga)
];

export default userProfileModalSagas;
