export default class ProfileService {
  constructor(http) {
    this.http = http;
  }

  getCurrentProfileInfo = async () => {
    const url = "/profile/";
    const { data } = await this.http.get(url);
    return data;
  }

  updateCurrentUserProfile = async profileData => {
    const url = "/profile/";

    if (profileData.birthday) {
      profileData.birthday = new Date(profileData.birthday);
    }

    const { data } = await this.http.patch(url, profileData);
    return data;
  };
}
