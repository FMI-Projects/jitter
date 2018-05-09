import React, {Component} from "react";
import PropTypes from "prop-types";

import PostCard from "./PostCard/PostCard";

class PostsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object
  };

  render() {
    const {posts} = this.props;

    return (
      <div>
        {posts.map(post => {
          return (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PostsList;
