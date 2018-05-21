import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./CommentsList.styles";
import List from "material-ui/List";
import { withStyles } from "material-ui/styles";

import CommentForm from "../CommentForm/CommentForm";
import CommentListItem from "./CommentListItem/CommentListItem";

class CommentsList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };

  render() {
    const { comments, classes, postId } = this.props;
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
          <CommentForm postId={postId} formName={`createComment-${postId}`} />
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(CommentsList);
