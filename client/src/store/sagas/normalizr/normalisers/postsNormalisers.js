import { normalize } from "normalizr";
import postSchema from "../schemas/postSchema";

export const postsListNormaliser = postsList =>
  normalize(postsList, [postSchema]);

export const postNormaliser = post => normalize(post, postSchema);
