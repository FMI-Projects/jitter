import { takeLatest, all } from "redux-saga/effects";
import * as actionTypes from "../../actions/actionTypes";

import * as friendhsipEmitter from "./emitters/friendshipEmitter";

export default function* watchSockets(socket) {
  yield all([
    takeLatest(
      actionTypes.USER_PROFILE_MARK_FRIENDSHIPS_SEEN,
      friendhsipEmitter.markFriendshipsAsSeen,
      socket
    )
  ]);
}
