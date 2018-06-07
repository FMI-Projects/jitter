export const friendshipNormalizer = friendship => {
  const normalizedFriendship = {};

  normalizedFriendship._id = friendship.with._id;
  normalizedFriendship.seen = friendship.seen;
  normalizedFriendship.with = friendship.with._id;
  normalizedFriendship.status = friendship.status;

  return { normalizedFriendship, with: { ...friendship.with } };
};
