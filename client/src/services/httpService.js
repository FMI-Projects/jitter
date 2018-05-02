import axios from "axios";

export default class HttpService {
  constructor(baseUrl) {
    this.axios = axios;
    this.baseUrl = baseUrl;
  }

  get(url) {
    return this.axios.get(this.baseUrl + url);
  }

  post(url, data) {
    return this.axios.post(this.baseUrl + url, data);
  }

  put(url, data) {
    return this.axios.put(this.baseUrl + url, data);
  }

  delete(url) {
    return this.axios.delete(this.baseUrl + url);
  }
}
