export default class CommentService {
  constructor(http) {
    this.http = http;
  }

  deleteComment = async commentId => {
    const url = `/api/comments/${commentId}`;
    const response = await this.http.delete(url);

    return response.data;
  };
}
