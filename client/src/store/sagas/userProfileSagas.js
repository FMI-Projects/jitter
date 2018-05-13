import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* userProfileGetInfoSaga(action) {
  try {
    const { firstName, lastName, profilePictureUrl } = yield call(profileService.getCurrentProfileInfo);

    let navProfilePictureUrl = null;
    if (profilePictureUrl) {
      navProfilePictureUrl = null;
    }

    yield put(
      actions.userProfileSetInfo(
        firstName,
        lastName,
        profilePictureUrl,
        navProfilePictureUrl
      )
    );
  } catch (e) {}
}
