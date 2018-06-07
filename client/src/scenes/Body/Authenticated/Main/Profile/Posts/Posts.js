import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map } from "immutable";

import PostsList from "components/Posts/PostsList/PostsList";

const posts = props => {
  const { posts, currentUserId, profileId } = props;

  return (
    <PostsList
      posts={posts}
      canAddPost={currentUserId === profileId}
      currentUserId={currentUserId}
    />
  );
};

posts.propTypes = {
  profileId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const posts = state
    .getIn(["posts", "posts", "allIds"])
    .map(p => state.getIn(["posts", "posts", "byId", p]))
    .map(p =>
      p.set(
        "author",
        new Map({
          _id: state.getIn(["profile", "profileId"]),
          firstName: state.getIn(["profile", "firstName"]),
          lastName: state.getIn(["profile", "lastName"]),
          profilePictureUrl: state.getIn(["profile", "profilePictureUrl"])
        })
      )
    );

  return {
    posts,
    currentUserId: state.getIn(["auth", "userId"]),
    profileId: state.getIn(["profile", "profileId"])
  };
};

export default connect(mapStateToProps)(posts);
