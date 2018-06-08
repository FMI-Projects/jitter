import { schema } from "normalizr";

import profile from "./profileSchema";

const friendship = new schema.Entity("friendship", {
  with: profile
});

export default friendship;
