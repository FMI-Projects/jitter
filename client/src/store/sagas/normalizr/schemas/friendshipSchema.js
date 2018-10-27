import { schema } from "normalizr";
import * as formatImage from "../../../../utilities/formatters/formatImage";

const friendshipWith = new schema.Entity(
  "with",
  {},
  {
    idAttribute: "_id",
    processStrategy: entity => {
      entity.profilePictureUrl = formatImage.getFullUrl(
        entity.profilePictureUrl
      );
      return entity;
    }
  }
);

const friendship = new schema.Entity(
  "friendship",
  {
    with: friendshipWith
  },
  {
    idAttribute: "_id",
    processStrategy: entity => {
      entity._id = entity.with._id ? entity.with._id : entity.with;
      return entity;
    }
  }
);

export default friendship;
