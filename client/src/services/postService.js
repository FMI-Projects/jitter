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

  updatePost = async (postId, title, content, imageUrl) => {
    const url = `/api/posts/${postId}`;
    const postData = { title, content, imageUrl };
    const response = await this.http.put(url, postData);

    return response.data;
  };

  deletePost = async postId => {
    const url = `/api/posts/${postId}`;
    const response = await this.http.delete(url);

    return response.data;
  };

  createPostComment = async (postId, content) => {
    const url = `/api/posts/${postId}/comments`;
    const commentData = { content };
    const response = await this.http.post(url, commentData);

    return response.data;
  };

  likePost = async (postId, reaction) => {
    const url = `/api/posts/${postId}/likes`;
    const likeData = { reaction };
    const response = await this.http.post(url, likeData);

    return response.data;
  };

  getPostLikes = async postId => {
    const url = `/api/posts/${postId}/likes`;
    const { data } = await this.http.get(url);

    return data;
  };
}
