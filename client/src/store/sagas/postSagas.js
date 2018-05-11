import {put, call} from "redux-saga/effects";

import * as actions from "../actions";
import {postsService} from "../../services";

export function* postCommentsGetSaga(action) {
  try {
    const data = yield call([postsService, "getPostComments"], action.postId);

    yield put(actions.postCommentsGetSuccess(data, action.postId));
  } catch (e) {}
}

export function* postsGetSaga(action) {
  try {
    const data = yield call([postsService, "getUserPosts"], action.profileId);

    yield put(actions.postsGetSuccess(data));
  } catch (e) {}
}
