import React, {Component} from "react";
import PropTypes from "prop-types";

import PostCard from "./PostCard/PostCard";

class PostsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
    classes: PropTypes.object,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    profilePictureUrl: PropTypes.string
  };

  render() {
    const {posts, firstName, lastName, profilePictureUrl} = this.props;
    const author = {firstName, lastName, profilePictureUrl};

    return (
      <div>
        {posts.map(post => {
          return (
            <div key={post._id}>
              <PostCard post={post} author={author} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default PostsList;
