import { fromJS } from "immutable";

import normalisers from "../../normalizr/normalisers";
import * as actionTypes from "../../../actions/actionTypes";

const normalizeProperties = (type, payload) => {
  switch (type) {
    case actionTypes.USER_PROFILE_ADD_FRIENDSHIP:
      payload.friendship = normalisers.friendshipNormaliser(payload.friendship);
      break;
    case actionTypes.USER_PROFILE_UPDATE_FRIENDSHIP:
      payload.friendship = normalisers.friendshipListNormaliser(
        payload.friendship
      );
      break;
    case actionTypes.ONLINE_FRIENDS_SET:
      payload.onlineFriends = normalisers.profileListNormaliser(
        payload.onlineFriends
      );
      break;
    case actionTypes.ONLINE_FRIENDS_ADD:
      payload.friend = normalisers.profileNormaliser(payload.friend);
      break;
    default:
      break;
  }
};

const transformToImmutable = payload => {
  const result = {};

  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      result[key] = fromJS(payload[key]) || payload[key];
    }
  }

  return result;
};

const payloadToNormalisedImmutable = (type, payload) => {
  normalizeProperties(type, payload);
  return transformToImmutable(payload);
};

export default payloadToNormalisedImmutable;
