import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./CommentsList.styles";
import List from "material-ui/List";
import { withStyles } from "material-ui/styles";

import CommentForm from "../CommentForm/CommentForm";
import CommentListItem from "./CommentListItem/CommentListItem";

const commentsList = props => {
  const { comments, classes, postId } = props;
  return (
    <div className={classes.root}>
      <List>
        {comments.map(comment => {
          return (
            <Fragment key={comment._id}>
              <CommentListItem comment={comment} postId={postId} />
            </Fragment>
          );
        })}
        <CommentForm
          postId={postId}
          formName={`createComment-${postId}`}
          annotation="Write a comment"
        />
      </List>
    </div>
  );
};

commentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default withStyles(styles)(commentsList);
