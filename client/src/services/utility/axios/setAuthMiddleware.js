import axios from "./axios";

const setAuthMiddleware = store => {
  axios.interceptors.request.use(req => {
    const token = store.getState().getIn(["auth", "token"]);
    req.headers["x-auth"] = token;
    return req;
  });
};

export default setAuthMiddleware;
