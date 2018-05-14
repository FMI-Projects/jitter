import {put, call} from "redux-saga/effects";

import * as actions from "../actions";
import {postsService} from "../../services";
import {SubmissionError} from "redux-form";

export function* postCommentsGetSaga(action) {
  try {
    const data = yield call(postsService.getPostComments, action.postId);

    yield put(actions.postCommentsGetSuccess(data, action.postId));
  } catch (e) {}
}

export function* postsGetSaga(action) {
  try {
    const data = yield call(postsService.getUserPosts, action.profileId);

    yield put(actions.postsGetSuccess(data));
  } catch (e) {}
}

export function* postsCreateSaga(action) {
  try {
    const post = yield call(
      postsService.createPost,
      action.payload.title,
      action.payload.content,
      action.payload.imageUrl
    );

    yield put(actions.postsCreateSuccess(post));
    yield put(actions.postCreate.success());
  } catch (e) {
    const formError = new SubmissionError({
      _error: e.message
    });

    yield put(actions.postCreate.failure(formError));
  }
}
