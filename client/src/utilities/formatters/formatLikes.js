export const getLikesTest = likesCount => {
  let text;
  likesCount === 1 ? (text = "person likes") : (text = "people like");

  return text;
};
