export default class PostsService {
  constructor(http) {
    this.http = http;
  }

  async getUserPosts(profileId) {
    const url = `/api/posts/user/${profileId}`;
    const {data} = await this.http.get(url);
    return data;
  }
}
