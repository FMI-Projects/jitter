import axios from "./axios";

const setAuthMiddleware = (store) => {
  store.subscribe(userTokenChangeListener);

  function userTokenChangeListener() {
    const token = store.getState().auth.token;
    if (token) {
      axios.defaults.headers.common["x-auth"] = token;
    } else {
      axios.defaults.headers.common["x-auth"] = null;
    }
  }
};

export default setAuthMiddleware;
