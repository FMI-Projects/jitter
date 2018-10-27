import { schema } from "normalizr";

import post from "./postSchema";
import profile from "./profileSchema";

const like = new schema.Entity(
  "like",
  {
    post,
    author: profile
  },
  { idAttribute: "_id" }
);

export default like;
