import { schema } from "normalizr";

import profile from "./profileSchema";

const post = new schema.Entity("post", {
  author: profile
});

export default post;
