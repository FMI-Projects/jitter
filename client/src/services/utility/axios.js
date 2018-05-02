import axios from "axios";

import store from "../../store";

store.subscribe(userTokenChangeListener);

function userTokenChangeListener() {
  const token = store.getState().auth.token;
  if (token) {
    axios.defaults.headers.common["x-auth"] = token;
  } else {
    axios.defaults.headers.common["x-auth"] = null;
  }
}

const baseURL = "http://localhost:8000/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
