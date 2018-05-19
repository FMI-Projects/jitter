import { put, call } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import * as actions from "../actions";
import { postService } from "../../services";
import { imageService } from "../../services";
import * as formatError from "../../utilities/formatters/formatError";

export function* postCommentsGetSaga(action) {
  try {
    const data = yield call(postService.getPostComments, action.postId);

    yield put(actions.postCommentsGetSuccess(data, action.postId));
  } catch (e) {}
}

export function* postsCreateSaga(action) {
  try {
    let imageKey;
    if (action.payload.imageUrl) {
      const imageData = yield call(imageService.getSignedUrl);
      yield call(
        imageService.uploadImage,
        imageData.url,
        action.payload.imageUrl
      );
      imageKey = imageData.key;
    }

    const post = yield call(
      postService.createPost,
      action.payload.title,
      action.payload.content,
      imageKey
    );

    yield put(actions.postsCreateSuccess(post));
    yield put(actions.postCreate.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });

    yield put(actions.postCreate.failure(formError));
  }
}

export function* postsUpdateSaga(action) {
  try {
    let imageKey;
    if (action.payload.imageUrl) {
      const imageData = yield call(imageService.getSignedUrl);
      yield call(
        imageService.uploadImage,
        imageData.url,
        action.payload.imageUrl
      );
      imageKey = imageData.key;
    }

    const post = yield call(
      postService.updatePost,
      action.payload._id,
      action.payload.title,
      action.payload.content,
      imageKey
    );

    yield put(actions.postsUpdateSuccess(post));
    yield put(actions.postUpdate.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });

    yield put(actions.postUpdate.failure(formError));
  }
}

export function* postsDeleteSaga(action) {
  try {
    const data = yield call(postService.deletePost, action.postId);

    yield put(actions.postsDeleteSuccess(data));
  } catch (e) {}
}
