import { put, call, takeLatest, delay } from "redux-saga/effects";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { profileService } from "../../services";
import normalisers from "./normalizr/normalisers";
import toNormalisedImmutable from "./utilities/toNormalisedImmutable";

const SEARCH_DEBOUNCE_TIME = 0.5 * 1000;

function* searchGetSaga(action) {
  yield delay(SEARCH_DEBOUNCE_TIME);

  try {
    let profiles = yield call(
      profileService.searchProfiles,
      action.searchQuery
    );

    profiles = yield call(
      toNormalisedImmutable,
      profiles,
      normalisers.profileListNormaliser
    );

    yield put(actions.searchGetSuccess(profiles));
  } catch (e) {}
}

const searchSagas = [takeLatest(actionTypes.SEARCH_GET, searchGetSaga)];

export default searchSagas;
