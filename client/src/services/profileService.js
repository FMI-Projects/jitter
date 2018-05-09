export default class ProfileService {
  constructor(http) {
    this.http = http;
  }

  async getCurrentProfileInfo() {
    const url = "/profile/";
    const { data } = await this.http.get(url);
    return data;
  }

  async updateCurrentUserProfile(profileData) {
    const url = "/profile/";
    const { data } = await this.http.patch(url, profileData);
    return data;
  }
}
