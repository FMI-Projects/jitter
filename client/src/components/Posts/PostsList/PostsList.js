import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";

import PostCard from "../PostCard/PostCard";
import AddPost from "./AddPost/AddPost";
import styles from "./PostsList.styles";

class PostsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
    classes: PropTypes.object,
    canAddPost: PropTypes.bool.isRequired
  };

  render() {
    const {posts, classes, canAddPost} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.formButton}>
          {canAddPost ? <AddPost /> : null}
        </div>

        <div className={classes.list}>
          {posts.map(post => {
            return (
              <Fragment key={post._id}>
                <PostCard canAddPost={canAddPost} post={post} />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
