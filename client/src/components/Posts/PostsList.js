import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import styles from "./PostsList.styles";

import {withStyles} from "material-ui/styles";

import PostCard from "./PostCard/PostCard";
import CreatePost from "./Post/CreatePost";

class PostsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
    classes: PropTypes.object
  };

  render() {
    const {posts, classes} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.formButton}>
          <CreatePost />
        </div>

        <div className={classes.list}>
          {posts.map(post => {
            return (
              <Fragment key={post._id}>
                <PostCard post={post} />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
