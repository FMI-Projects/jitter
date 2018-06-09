import { normalize } from "normalizr";
import profileSchema from "../schemas/profileSchema";

export const profileListNormaliser = profileList =>
  normalize(profileList, [profileSchema]);

export const profileNormaliser = profile => normalize(profile, profileSchema);
