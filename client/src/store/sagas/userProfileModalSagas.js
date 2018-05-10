import { put, call } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import * as actions from "../actions";
import { imageService } from "../../services";
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
    yield put(actions.userProfilePatch.success());
    const { url, key } = yield call([imageService, "getSignedUrl"]);
    yield call(
      [imageService, "uploadImage"],
      url,
      action.payload.profilePicture
    );
    yield call(userProfileUpdate, { profilePictureUrl: key });
    yield put(actions.userProfileModalContinue());
    yield put(actions.userProfilePicture.success());
  } catch (e) {
    const formError = new SubmissionError({
      _error: e.message
    });
    yield put(actions.userProfilePicture.failure(formError));
  }
}
