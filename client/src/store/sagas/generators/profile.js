import { put, call } from "redux-saga/effects";

import * as actions from "../../actions";
import { profileService, timeService } from "../../../services";

export function* userProfileUpdate(profileData) {
  if (profileData.birthday) {
    profileData.birthday = yield call(
      [timeService, "getUtcDate"],
      profileData.birthday
    );
  }

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
