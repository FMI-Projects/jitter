import * as commentNormalisers from "./commentNormalisers";
import * as postNormalisers from "./postsNormalisers";
import * as profileNormalisers from "./profileNormalisers";
import * as likeNormalisers from "./likeNormalisers";
import * as friendshipNormalisers from "./friendshipNormalisers";

export default {
  ...commentNormalisers,
  ...postNormalisers,
  ...profileNormalisers,
  ...likeNormalisers,
  ...friendshipNormalisers
};
