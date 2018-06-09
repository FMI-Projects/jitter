import { schema } from "normalizr";

import post from "./postSchema";
import profile from "./profileSchema";

const comment = new schema.Entity(
  "comment",
  {
    post,
    author: profile
  },
  { idAttribute: "_id" }
);

export default comment;
