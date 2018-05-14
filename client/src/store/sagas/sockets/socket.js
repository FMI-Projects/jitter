import WebSocket from "socket.io-client";
import { eventChannel } from "redux-saga";
import { put, call, take } from "redux-saga/effects";

const baseUrl = "http://localhost:8000";
let socketChannel;

export function* openSocket(token) {
  socketChannel = yield call(initializeSocket, token);
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

export function closeSocket() {
  if (socketChannel) {
    socketChannel.close();
    socketChannel = null;
  }
}

function initializeSocket(token) {
  return eventChannel(emitter => {
    const socket = new WebSocket(baseUrl);

    socket.on("connect", function() {
      socket.emit("authentication", { token });
      socket.on("authenticated", () => {
        socket.onmessage = e => {
          return emitter({ type: "ACTION_TYPE" });
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  });
}
