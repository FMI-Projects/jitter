import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* profileGetInfoSaga(action) {
  try {
    const {
      _id,
      firstName,
      lastName,
      profilePictureUrl,
      navProfilePictureUrl
    } = yield call([profileService, "getCurrentProfileInfo"]);

    yield put(
      actions.profileSetInfo(
        _id,
        firstName,
        lastName,
        profilePictureUrl,
        navProfilePictureUrl
      )
    );
  } catch (e) {
    yield put(actions.profileError(e.message));
  }
}

export function* profileUpdateSaga(action) {
  try {
    const {
      _id,
      firstName,
      lastName,
      profilePictureUrl,
      navProfilePictureUrl
    } = yield call([profileService, "updateCurrentUserProfile", action.profileData]);
    yield put(
      actions.profileSetInfo(
        _id,
        firstName,
        lastName,
        profilePictureUrl,
        navProfilePictureUrl
      )
    );
  } catch (e) {
    yield put(actions.profileError(e.message));
  }
}
