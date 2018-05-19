export default class PostService {
  constructor(http) {
    this.http = http;
  }

  getPostComments = async postId => {
    const url = `/api/posts/${postId}/comments`;
    const { data } = await this.http.get(url);
    return data;
  };

  createPost = async (title, content, imageUrl) => {
    const url = `/api/posts`;
    const postData = { title, content, imageUrl };
    const response = await this.http.post(url, postData);

    return response.data;
  };

  updatePost = async (id, title, content, imageUrl) => {
    const url = `/api/posts/${id}`;
    const postData = { title, content, imageUrl };
    const response = await this.http.put(url, postData);

    return response.data;
  };

  deletePost = async id => {
    const url = `/api/posts/${id}`;
    const response = await this.http.delete(url);

    return response.data;
  };

  createPostComment = async (id, content) => {
    const url = `/api/posts/${id}/comments`;
    const commentData = { content };
    const response = await this.http.post(url, commentData);

    return response.data;
  };
}
