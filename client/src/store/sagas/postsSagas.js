import {put, call} from "redux-saga/effects";

import * as actions from "../actions";
import {postsService} from "../../services";

export function* userPostsGetSaga(action) {
  try {
    const data = yield call([postsService, "getUserPosts"], action.profileId);

    yield put(actions.userPostsGetSuccess(data));
  } catch (e) {}
}
