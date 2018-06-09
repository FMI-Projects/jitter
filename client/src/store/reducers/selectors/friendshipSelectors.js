import { createSelector } from "reselect";

const friendshipsSelector = state =>
  state.getIn(["userProfile", "friendships", "byId"]);

const pendingFriendshipsSelector = createSelector(
  [friendshipsSelector],
  friendships => friendships.filter(f => f.get("status") === "Pending")
);

const friendshipIdsSelector = state =>
  state.getIn(["userProfile", "friendships", "allIds"]);

const friendshipsWithSelector = state =>
  state.getIn(["userProfile", "friendshipsWith"]);

export const pendingFriendshipsWithSelector = createSelector(
  [pendingFriendshipsSelector, friendshipIdsSelector, friendshipsWithSelector],
  (pendingFriendships, friendshipids, friendshipsWith) =>
    friendshipids
      .filter((v, k) => pendingFriendships.keySeq().some(f => v === f))
      .map(f => friendshipsWith.get(f))
);

export const unseenFriendshipsCountSelector = createSelector(
  [pendingFriendshipsSelector],
  pendingFriendships =>
    pendingFriendships.filter(f => f.get("seen") === false).size
);
