import {put, call} from "redux-saga/effects";

import * as actions from "../actions";
import {postsService} from "../../services";

export function* profilePostsGetSaga(action) {
  try {
    const data = yield call([postsService, "getUserPosts"], action.profileId);

    yield put(actions.profilePostsGetSuccess(data));
  } catch (e) {}
}
