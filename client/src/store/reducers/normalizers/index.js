import * as postsNormalizer from "./postsNormalizer";
import * as commentNormalizer from "./commentNormalizer";
import * as likeNormalizer from "./likeNormalizer";
import * as friendshipNormalizer from "./friendshipNormalizer";

export default {
  ...postsNormalizer,
  ...commentNormalizer,
  ...likeNormalizer,
  ...friendshipNormalizer
};
