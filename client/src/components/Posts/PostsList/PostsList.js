import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import PostCard from "components/Posts/PostCard/PostCard";
import AddPost from "./AddPost";
import styles from "./PostsList.styles";
import ToJs from "hoc/ToJs/ToJs";

class PostsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
    currentUserId: PropTypes.string,
    classes: PropTypes.object,
    canAddPost: PropTypes.bool
  };

  render() {
    const { posts, classes, canAddPost } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.formButton}>
          {canAddPost === false ? null : <AddPost />}
        </div>

        <div className={classes.list}>
          {posts.map(postId => {
            return (
              <Fragment key={postId}>
                <PostCard post={postId} />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ToJs(PostsList));
