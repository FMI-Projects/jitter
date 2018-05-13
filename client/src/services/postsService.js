export default class PostsService {
  constructor(http) {
    this.http = http;
  }

  getUserPosts = async (profileId) => {
    const url = `/api/profiles/${profileId}/posts`;
    const {data} = await this.http.get(url);
    return data;
  }

  getPostComments = async (postId) => {
    const url = `/api/posts/${postId}/comments`;
    const {data} = await this.http.get(url);
    return data;
  }
}
