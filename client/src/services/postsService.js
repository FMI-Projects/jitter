export default class PostsService {
  constructor(http) {
    this.http = http;
  }

  async getUserPosts() {
    const url = "/api/posts";
    const {data} = await this.http.get(url);
    return data;
  }
}
