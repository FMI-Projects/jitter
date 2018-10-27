import { normalize } from "normalizr";
import likeSchema from "../schemas/likeSchema";

export const likeListNormaliser = likesList =>
  normalize(likesList, [likeSchema]);

export const likeNormaliser = like => normalize(like, likeSchema);
