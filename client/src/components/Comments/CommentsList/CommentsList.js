import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import List from "material-ui/List";
import { withStyles } from "material-ui/styles";

import styles from "./CommentsList.styles";

import CommentListItem from "./CommentListItem/CommentListItem";

const commentsList = props => (
  <div className={props.classes.root}>
    <List>
      {props.commentIds.map(c => <CommentListItem key={c} commentId={c} />)}
    </List>
  </div>
);

commentsList.propTypes = {
  commentIds: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const commentIds = state.getIn([
    "posts",
    "posts",
    "byId",
    ownProps.postId,
    "comments"
  ]);

  return {
    commentIds
  };
};

export default connect(mapStateToProps)(withStyles(styles)(commentsList));
