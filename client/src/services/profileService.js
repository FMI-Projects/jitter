export default class ProfileService {
  constructor(http) {
    this.http = http;
  }

  getCurrentProfileInfo = async () => {
    const url = "/profile/";
    const { data } = await this.http.get(url);
    return data;
  };

  updateCurrentUserProfile = async profileData => {
    const url = "/profile/";

    if (profileData.birthday) {
      profileData.birthday = new Date(profileData.birthday);
    }

    const { data } = await this.http.patch(url, profileData);
    return data;
  };

  getProfileInfo = async profileId => {
    const url = `/api/profiles/${profileId}`;
    const { data } = await this.http.get(url);
    return data;
  };

  getProfilePosts = async profileId => {
    const url = `/api/profiles/${profileId}/posts`;
    const { data } = await this.http.get(url);
    return data;
  };

  sendFriendRequest = async profileId => {
    const url = `/profile/friendships`;
    const { data } = await this.http.post(url, { profileId });
    return data;
  };

  updateFriendRequest = async (profileId, action) => {
    const url = `/profile/friendships/${profileId}`;
    const { data } = await this.http.put(url, { action });
    return data;
  };

  deleteFriendRequest = async profileId => {
    const url = `/profile/friendships/${profileId}`;
    const { data } = await this.http.delete(url);
    return data;
  };

  searchProfiles = async searchQuery => {
    const url = `/api/profiles?name=${searchQuery}`;
    const { data } = await this.http.get(url);
    return data;
  };
}
