export const postNormalizer = post => {
  const normalizedPost = {};

  normalizedPost._id = post._id;
  normalizedPost.title = post.title;
  normalizedPost.content = post.content;
  normalizedPost.imageUrl = post.imageUrl;
  normalizedPost.author = post.author._id;

  return { normalizedPost, author: {...post.author} };
};
