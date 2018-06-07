export const likeNormalizer = like => {
  const normalizedLike = {};

  normalizedLike._id = like._id;
  normalizedLike.reaction = like.title;
  normalizedLike.post = like.post;
  normalizedLike.author = like.author._id;

  return { normalizedLike, author: {...like.author} };
};
