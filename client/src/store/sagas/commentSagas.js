import { put, call } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import * as actions from "../actions";
import { commentService } from "../../services";
import * as formatError from "../../utilities/formatters/formatError";

export function* commentsDeleteSaga(action) {
  try {
    yield call(commentService.deleteComment, action.commentId);

    yield put(actions.commentsDeleteSuccess(action.postId, action.commentId));
  } catch (e) {}
}

export function* commentsUpdateSaga(action) {
  try {
    const comment = yield call(
      commentService.updateComment,
      action.payload._id,
      action.payload.content
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
