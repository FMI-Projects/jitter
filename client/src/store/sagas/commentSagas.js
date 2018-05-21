import { put, call } from "redux-saga/effects";

import * as actions from "../actions";
import { commentService } from "../../services";

export function* commentsDeleteSaga(action) {
  try {
    yield call(commentService.deleteComment, action.commentId);

    yield put(actions.commentsDeleteSuccess(action.postId, action.commentId));
  } catch (e) {}
}
