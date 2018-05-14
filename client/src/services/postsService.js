export default class PostsService {
  constructor(http) {
    this.http = http;
  }

  getUserPosts = async profileId => {
    const url = `/api/profiles/${profileId}/posts`;
    const {data} = await this.http.get(url);
    return data;
  };

  getPostComments = async postId => {
    const url = `/api/posts/${postId}/comments`;
    const {data} = await this.http.get(url);
    return data;
  };

  createPost = async (title, content, imageUrl) => {
    const url = `/api/posts`;
    const postData = {title, content, imageUrl};
    const response = await this.http.post(url, postData);

    return response.data;
  };
}
