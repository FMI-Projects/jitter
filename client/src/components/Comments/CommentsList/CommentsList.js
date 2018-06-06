import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./CommentsList.styles";
import List from "material-ui/List";
import { withStyles } from "material-ui/styles";

import CommentListItem from "./CommentListItem/CommentListItem";

const commentsList = props => {
  const { comments, classes, postId, currentUserId } = props;
  return (
    <div className={classes.root}>
      <List>
        {comments.map(comment => {
          return (
            <Fragment key={comment._id}>
              <CommentListItem
                comment={comment}
                postId={postId}
                canModify={currentUserId === comment.author._id}
              />
            </Fragment>
          );
        })}
      </List>
    </div>
  );
};

commentsList.propTypes = {
  comments: PropTypes.array,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired
};

export default withStyles(styles)(commentsList);
