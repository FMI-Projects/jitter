import { schema } from "normalizr";
import * as formatImage from "../../../../utilities/formatters/formatImage";

import profile from "./profileSchema";

const post = new schema.Entity(
  "post",
  {
    author: profile
  },
  {
    idAttribute: "_id",
    processStrategy: entity => {
      entity.imageUrl = formatImage.getFullUrl(entity.imageUrl);
      return entity;
    }
  }
);

export default post;
