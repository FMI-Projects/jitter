import WebSocket from "socket.io-client";
import { eventChannel } from "redux-saga";

const baseUrl = "http://localhost:8000";

export default function initializeSocket() {
  const ws = new WebSocket(baseUrl, { autoConnect: false });

  return eventChannel(emitter => {
    ws.connect();

    ws.onmessage = e => {
      // dispatch an action with emitter here
      return emitter({ type: "ACTION_TYPE" });
    };
    // unsubscribe function
    return () => {
      // do whatever to interrupt the socket communication here
      ws.disconnect();
    };
  });
}
