import WebSocket from "socket.io-client";
import { eventChannel } from "redux-saga";

export default function initializeSocket() {
  return eventChannel(emitter => {
    // init the connection here
    const ws = new WebSocket("http://localhost:8000");

    ws.onmessage = e => {
      // dispatch an action with emitter here
      return emitter({ type: "ACTION_TYPE" });
    };
    // unsubscribe function
    return () => {
      // do whatever to interrupt the socket communication here
    };
  });
}
