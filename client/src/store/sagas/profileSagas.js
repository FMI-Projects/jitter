import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* profileGetInfoSaga(action) {
  try {
    const { _id, firstName, lastName, profilePictureUrl } = yield call([
      profileService,
      "getCurrentProfileInfo"
    ]);

    let navProfilePictureUrl = null;
    if (profilePictureUrl) {
      navProfilePictureUrl = null;
    }

    yield put(
      actions.profileSetInfo(
        _id,
        firstName,
        lastName,
        profilePictureUrl,
        navProfilePictureUrl
      )
    );
  } catch (e) {}
}
