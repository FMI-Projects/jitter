import { put, call } from "redux-saga/effects";

import * as actions from "../../actions";
import { profileService, timeService } from "../../../services";
import normalisers from "../normalizr/normalisers";
import toNormalisedImmutable from "../utilities/toNormalisedImmutable";

export function* userProfileUpdate(profileData) {
  if (profileData.birthday) {
    profileData.birthday = yield call(
      timeService.convertToUtcDate,
      profileData.birthday,
      "MM/DD/YYYY"
    );
  }

  const { firstName, lastName, profilePictureUrl, friendships } = yield call(
    profileService.updateCurrentUserProfile,
    profileData
  );

  const friendshipsData = yield call(
    toNormalisedImmutable,
    friendships,
    normalisers.friendshipListNormaliser
  );

  yield put(
    actions.userProfileSetInfo(
      firstName,
      lastName,
      profilePictureUrl,
      friendshipsData
    )
  );
}
