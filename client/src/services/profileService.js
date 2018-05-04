export default class ProfileService {
  constructor(http) {
    this.http = http;
  }

  async getCurrentProfileInfo() {
    const url = "/api/profile/me";
    const { data } = await this.http.get(url);
    return data;
  }
}
