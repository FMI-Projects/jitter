export default class HttpService {
  constructor(requester, baseUrl) {
    this.requester = requester;
    this.baseUrl = baseUrl;
  }

  get(url) {
    return this.requester.get(this.baseUrl + url);
  }

  post(url, data) {
    return this.requester.post(this.baseUrl + url, data);
  }

  put(url, data) {
    return this.requester.put(this.baseUrl + url, data);
  }

  delete(url) {
    return this.requester.delete(this.baseUrl + url);
  }
}
