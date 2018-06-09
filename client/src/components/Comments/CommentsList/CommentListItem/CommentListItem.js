import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CommentListItemContent from "./CommentListItemContent/CommentListItemContent";

const commentListItem = props => (
  <CommentListItemContent comment={props.comment} canModify={props.canModify} />
);

commentListItem.propTypes = {
  comment: PropTypes.object.isRequired,
  canModify: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const comment = state
    .getIn(["posts", "comments", ownProps.commentId])
    .set(
      "author",
      state.getIn([
        "posts",
        "authors",
        state.getIn(["posts", "comments", ownProps.commentId, "author"])
      ])
    );

  return {
    comment,
    canModify:
      state.getIn(["auth", "userId"]) === comment.getIn(["author", "_id"])
  };
};

export default connect(mapStateToProps)(commentListItem);
