export const commentNormalizer = comment => {
  const normalizedComment = {};

  normalizedComment._id = comment._id;
  normalizedComment.content = comment.content;
  normalizedComment.post = comment.post;
  normalizedComment.createdAt = comment.createdAt;
  normalizedComment.author = comment.author._id;

  return { normalizedComment, author: {...comment.author} };
};
