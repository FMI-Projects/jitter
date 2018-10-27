import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { SubmissionError } from "redux-form/immutable";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { postService } from "../../services";
import { imageService } from "../../services";
import * as formatError from "../../utilities/formatters/formatError";
import * as formatImage from "../../utilities/formatters/formatImage";
import normalisers from "./normalizr/normalisers";
import toNormalisedImmutable from "./utilities/toNormalisedImmutable";

function* postsCommentsGetSaga(action) {
  try {
    let comments = yield call(postService.getPostComments, action.postId);

    comments = yield call(
      toNormalisedImmutable,
      comments,
      normalisers.commentsListNormaliser
    );

    yield put(actions.postsCommentsGetSuccess(comments, action.postId));
  } catch (e) {}
}

function* postsCreateSaga(action) {
  try {
    let imageKey;
    if (action.payload.get("imageFile")) {
      const imageData = yield call(imageService.getSignedUrl);
      yield call(
        imageService.uploadImage,
        imageData.url,
        action.payload.get("imageFile")
      );
      imageKey = imageData.key;
    }

    let post = yield call(
      postService.createPost,
      action.payload.get("title"),
      action.payload.get("content"),
      imageKey
    );

    post.author = action.payload.get("author");

    post = yield call(toNormalisedImmutable, post, normalisers.postNormaliser);

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

function* postsUpdateSaga(action) {
  try {
    let imageKey;
    if (action.payload.get("imageFile")) {
      const imageData = yield call(imageService.getSignedUrl);
      yield call(
        imageService.uploadImage,
        imageData.url,
        action.payload.get("imageFile")
      );
      imageKey = imageData.key;
    } else {
      imageKey = formatImage.getRelativeUrl(action.payload.get("imageUrl"));
    }

    let post = yield call(
      postService.updatePost,
      action.payload.get("_id"),
      action.payload.get("title"),
      action.payload.get("content"),
      imageKey
    );

    post = yield call(toNormalisedImmutable, post, normalisers.postNormaliser);

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

function* postsDeleteSaga(action) {
  try {
    yield call(postService.deletePost, action.postId);

    yield put(actions.postsDeleteSuccess(action.postId));
  } catch (e) {}
}

function* postsCommentCreateSaga(action) {
  try {
    let comment = yield call(
      postService.createPostComment,
      action.payload.get("postId"),
      action.payload.get("content")
    );

    comment.author = action.payload.get("author");

    comment = yield call(
      toNormalisedImmutable,
      comment,
      normalisers.commentNormaliser
    );

    yield put(actions.postsCommentCreateSuccess(comment));
    yield put(actions.postCommentCreate.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });

    yield put(actions.postCommentCreate.failure(formError));
  }
}

function* postsLikeSaga(action) {
  try {
    let like = yield call(postService.likePost, action.postId, action.reaction);

    like = yield call(toNormalisedImmutable, like, normalisers.likeNormaliser);

    yield put(actions.postsLikeSuccess(like));
  } catch (e) {}
}

function* postsLikesGetSaga(action) {
  try {
    let likes = yield call(postService.getPostLikes, action.postId);

    likes = yield call(
      toNormalisedImmutable,
      likes,
      normalisers.likeListNormaliser
    );

    yield put(actions.postsLikesGetSuccess(action.postId, likes));
  } catch (e) {}
}

function* postsLikeDeleteSaga(action) {
  try {
    yield call(postService.deletePostLike, action.postId);

    yield put(actions.postsLikeDeleteSuccess(action.postId));
  } catch (e) {}
}

const postSagas = [
  takeEvery(actionTypes.POSTS_COMMENTS_GET, postsCommentsGetSaga),
  takeEvery(actionTypes.POSTS_LIKES_GET, postsLikesGetSaga),
  takeLatest(actionTypes.POSTS_DELETE, postsDeleteSaga),
  takeLatest(actionTypes.POSTS_LIKE, postsLikeSaga),
  takeLatest(actionTypes.POSTS_LIKE_DELETE, postsLikeDeleteSaga),
  takeLatest(actions.postCreate.REQUEST, postsCreateSaga),
  takeLatest(actions.postUpdate.REQUEST, postsUpdateSaga),
  takeLatest(actions.postCommentCreate.REQUEST, postsCommentCreateSaga)
];

export default postSagas;
