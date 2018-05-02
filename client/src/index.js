import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import store from "./store/store";
import {AUTH_SUCCESS} from "./store/actions/actionTypes";

const userId = localStorage.getItem("userId");

if (userId) {
  store.dispatch({type: AUTH_SUCCESS});
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
