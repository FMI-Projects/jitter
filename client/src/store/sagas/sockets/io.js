import io from "socket.io-client";
import wildcard from "socketio-wildcard";
import { eventChannel } from "redux-saga";
import { put, call, take, fork, cancel } from "redux-saga/effects";

import sagas from "./sagas";
import payloadToNormalisedImmutable from "./utilities/payloadToNormalisedImmutable";

const patch = wildcard(io.Manager);
const baseUrl = "http://localhost:8000";

let socket;
let socketSagas;
let socketChannel;

export function* openSocket(token) {
  socketChannel = yield call(initializeSocket, token);
  socketSagas = yield fork(sagas, socket);

  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

export function* closeSocket() {
  if (socketChannel) {
    yield call(socketChannel.close);
    socketChannel = null;
  }

  if (socketSagas) {
    yield cancel(socketSagas);
    socketSagas = null;
  }

  socket = null;
}

function initializeSocket(token) {
  return eventChannel(emitter => {
    socket = io(baseUrl);
    patch(socket);

    socket.on("connect", function() {
      socket.emit("authentication", { token });
      socket.on("authenticated", () => {
        socket.on("*", params => {
          const actionType = params.data[0];
          const payload = payloadToNormalisedImmutable(
            actionType,
            params.data[1]
          );
          return emitter({ type: actionType, ...payload });
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  });
}
