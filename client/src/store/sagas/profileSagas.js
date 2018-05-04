import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* profileGetInfoSaga(action) {
  try {
    const {
      profileId,
      firstName,
      lastName,
      profilePictureUrl,
      navProfilePictureUrl
    } = yield call([profileService, "getCurrentProfileInfo"]);

    yield put(
      actions.profileSetInfo(
        profileId,
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
