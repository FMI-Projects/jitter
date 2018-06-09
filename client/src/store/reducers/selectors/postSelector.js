import { createSelector } from "reselect";

const postSelector = (state, props) =>
  state.getIn(["posts", "posts", "byId", props.post]);

const authorSelector = (state, props) =>
  state.getIn([
    "posts",
    "authors",
    state.getIn(["posts", "posts", "byId", props.post, "author"])
  ]);

const makePostSelector = () =>
  createSelector([postSelector, authorSelector], (post, author) =>
    post.set("author", author)
  );

export default makePostSelector;
