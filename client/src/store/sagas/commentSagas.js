import { put, call, takeLatest } from "redux-saga/effects";
import { SubmissionError } from "redux-form/immutable";

import * as actions from "../actions";
import * as actionTypes from "../actions/actionTypes";
import { commentService } from "../../services";
import * as formatError from "../../utilities/formatters/formatError";

function* commentsDeleteSaga(action) {
  try {
    yield call(commentService.deleteComment, action.commentId);

    yield put(actions.commentsDeleteSuccess(action.postId, action.commentId));
  } catch (e) {}
}

function* commentsUpdateSaga(action) {
  try {
    const comment = yield call(
      commentService.updateComment,
      action.payload.get("_id"),
      action.payload.get("content")
    );

    yield put(actions.commentsUpdateSuccess(comment));
    yield put(actions.commentUpdate.success());
  } catch (e) {
    const error = yield call(formatError.formatHttpError, e);
    const formError = new SubmissionError({
      _error: error
    });

    yield put(actions.commentUpdate.failure(formError));
  }
}

const commentSagas = [
  takeLatest(actionTypes.COMMENTS_DELETE, commentsDeleteSaga),
  takeLatest(actions.commentUpdate.REQUEST, commentsUpdateSaga)
];

export default commentSagas;
