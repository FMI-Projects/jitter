import { put, call } from "redux-saga/effects";

import * as actions from "../../actions";
import { profileService } from "../../../services";

export function* profileUpdate(profileData) {
  yield put(actions.profileLoad());

  const {
    _id,
    firstName,
    lastName,
    profilePictureUrl,
    navProfilePictureUrl
  } = yield call([profileService, "updateCurrentUserProfile"], profileData);

  yield put(
    actions.profileSetInfo(
      _id,
      firstName,
      lastName,
      profilePictureUrl,
      navProfilePictureUrl
    )
  );
}
