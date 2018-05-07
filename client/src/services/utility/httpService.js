import axios from "./axios/axios";

export default class HttpService {
  get(url) {
    return axios.get(url);
  }

  post(url, data) {
    return axios.post(url, data);
  }

  put(url, data) {
    return axios.put(url, data);
  }

  delete(url) {
    return axios.delete(url);
  }

  patch(url, data) {
    return axios.patch(url, data);
  }
}
