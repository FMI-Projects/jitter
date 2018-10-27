import { createSelector } from "reselect";
import { Map } from "immutable";

const idSelector = state => state.getIn(["auth", "userId"]);

const firstNameSelector = state => state.getIn(["userProfile", "firstName"]);

const lastNameSelector = state => state.getIn(["userProfile", "lastName"]);

const profilePictureSelector = state =>
  state.getIn(["userProfile", "profilePictureUrl"]);

const authorSelector = createSelector(
  [idSelector, firstNameSelector, lastNameSelector, profilePictureSelector],
  (_id, firstName, lastName, profilePictureUrl) =>
    new Map({
      _id,
      firstName,
      lastName,
      profilePictureUrl
    })
);

export default authorSelector;
