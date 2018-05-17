import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* userProfileGetInfoSaga(action) {
  try {
    const { firstName, lastName, profilePictureUrl, friendships } = yield call(
      profileService.getCurrentProfileInfo
    );
    yield put(
      actions.userProfileSetInfo(
        firstName,
        lastName,
        profilePictureUrl,
        friendships
      )
    );
  } catch (e) {}
}
