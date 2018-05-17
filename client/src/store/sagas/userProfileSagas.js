import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { profileService } from "../../services";

export function* userProfileGetInfoSaga(action) {
  try {
    const { firstName, lastName, profilePictureUrl, friendShips } = yield call(
      profileService.getCurrentProfileInfo
    );
    yield put(
      actions.userProfileSetInfo(
        firstName,
        lastName,
        profilePictureUrl,
        friendShips
      )
    );
  } catch (e) {}
}
