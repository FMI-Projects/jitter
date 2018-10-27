import { schema } from "normalizr";
import friendshipSchema from "./friendshipSchema";
import * as formatImage from "../../../../utilities/formatters/formatImage";

const profile = new schema.Entity(
  "profile",
  {
    friendships: [friendshipSchema]
  },
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

export default profile;
