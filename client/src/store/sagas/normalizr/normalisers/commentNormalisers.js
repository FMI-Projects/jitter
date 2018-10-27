import { normalize } from "normalizr";
import commentSchema from "../schemas/commentSchema";

export const commentsListNormaliser = commentsList =>
  normalize(commentsList, [commentSchema]);

export const commentNormaliser = comment => normalize(comment, commentSchema);
