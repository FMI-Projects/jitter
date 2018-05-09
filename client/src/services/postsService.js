export default class PostsService {
  constructor(http) {
    this.http = http;
  }

  async getUserPosts(profileId) {
    const url = `/api/profiles/${profileId}/posts`;
    const {data} = await this.http.get(url);
    return data;
  }
}
