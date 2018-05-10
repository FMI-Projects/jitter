import { put, call } from "redux-saga/effects";

import * as actions from "../../actions";
import { profileService } from "../../../services";

export function* userProfileUpdate(profileData) {
  const {
    firstName,
    lastName,
    profilePictureUrl,
    navProfilePictureUrl
  } = yield call([profileService, "updateCurrentUserProfile"], profileData);

  yield put(
    actions.userProfileSetInfo(
      firstName,
      lastName,
      profilePictureUrl,
      navProfilePictureUrl
    )
  );
}
