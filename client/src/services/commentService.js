export default class CommentService {
  constructor(http) {
    this.http = http;
  }

  deleteComment = async commentId => {
    const url = `/api/comments/${commentId}`;
    const response = await this.http.delete(url);

    return response.data;
  };

  updateComment = async (commentId, content) => {
    const url = `/api/comments/${commentId}`;
    const commentData = { content };
    const response = await this.http.put(url, commentData);

    return response.data;
  };
}
