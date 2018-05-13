import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import styles from "./PostsList.styles";

import {withStyles} from "material-ui/styles";

import PostCard from "./PostCard/PostCard";

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
        {posts.map(post => {
          return (
            <Fragment key={post._id}>
              <PostCard post={post} />
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
