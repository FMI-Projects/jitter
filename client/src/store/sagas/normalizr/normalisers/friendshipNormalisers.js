import { normalize } from "normalizr";
import friendshipSchema from "../schemas/friendshipSchema";

export const friendshipListNormaliser = friendshipList =>
  normalize(friendshipList, [friendshipSchema]);

export const friendshipNormaliser = friendship =>
  normalize(friendship, friendshipSchema);
