import axios from "axios";

const baseUrl = "http://localhost:8000/";

export default class HttpService {
  get(url) {
    return axios.get(baseUrl + url);
  }

  post(url, data) {
    return axios.post(baseUrl + url, data);
  }

  put(url, data) {
    return axios.put(baseUrl + url, data);
  }

  delete(url) {
    return axios.delete(baseUrl + url);
  }
}
