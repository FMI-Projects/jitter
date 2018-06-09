import { createSelector } from "reselect";

const commentSelector = (state, props) =>
  state.getIn(["posts", "comments", props.commentId]);

const authorSelector = (state, props) =>
  state.getIn([
    "posts",
    "authors",
    state.getIn(["posts", "comments", props.commentId, "author"])
  ]);

const makeCommentSelector = () =>
  createSelector([commentSelector, authorSelector], (comment, author) =>
    comment.set("author", author)
  );

export default makeCommentSelector;
